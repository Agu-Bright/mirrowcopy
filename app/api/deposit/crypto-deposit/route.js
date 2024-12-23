import User from "@models/user";
import Wallet from "@models/wallet";
import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Deposit from "@models/Deposit";
import { transporter } from "@utils/nodemailer";

export const POST = async (req, res) => {
  const session = await getServerSession(
    req,
    {
      ...NextResponse,
      getHeader: (name) => NextResponse.headers?.get(name),
      setHeader: (name, value) => NextResponse.headers?.set(name, value),
    },
    authOptions
  );
  if (!session) {
    return Response.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }
  try {
    await connectDB;
    const body = await req.json();
    if (!body || !body.amount || !body.transactionHash)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Incomplet Deposit details",
        }),
        {
          status: 404,
        }
      );

    const wallet = await Wallet.findOne({ user: session?.user?.id });
    if (!wallet) {
      return new Response(
        JSON.stringify({ success: false, message: "No wallet found" }),
        {
          status: 404,
        }
      );
    }
    //create deposit for this user
    const deposit = await Deposit.create({
      ...body,
      user: session?.user.id,
      wallet: wallet.user,
    });

    // await transporter.sendMail({
    //   from: process.env.EMAIL,
    //   to: session?.user?.email,
    //   subject: "Investment Deposit",
    //   html: `
    //   <!DOCTYPE html>
    //   <html lang="en">
    //   <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <title>Reservaion Created </title>
    //     <style>
    //       body {
    //         font-family: Arial, sans-serif;
    //         margin: 0;
    //         padding: 0;
    //         background-color: white;
    //       }
    //       .container {
    //         max-width: 600px;
    //         margin: 20px auto;
    //         background-color: white;
    //         padding: 0px 0px 0px 0px;
    //         border-radius: 10px;
    //         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    //       }
    //       .header {
    //         background-color: white;
    //         color: #fff;
    //         padding: 10px;
    //         border-radius: 10px 10px 0 0;
    //         text-align: center;
    //       }
    //       .header img {
    //         max-width: 100px;
    //         height: auto;
    //       }
    //       .content {
    //         padding: 20px;
    //       }
    //       .footer {
    //         background-color: orange;
    //         color: white;
    //         padding: 10px;
    //         border-radius: 0 0 10px 10px;
    //         text-align: center;
    //       }
    //       h1{
    //         color: black;
    //       }
    //       .content p{
    //         color: black;
    //       }
      
    //       @media only screen and (max-width: 600px) {
    //         .container {
    //           max-width: 100%;
    //           border-radius: 0;
    //           box-shadow: none;
    //         }
    //         .header h1 {
    //           font-size: 15px;
    //         }
    //         .header img {
    //           max-width: 80px;
    //         }
    //       }
    //       @media (prefers-color-scheme: dark) {
    //         body {
    //           background-color: #333; /* Dark background color */
    //         }
    //         .container {
    //           background-color: #fff; /* White container background color */
    //           color: #333; /* Default text color in dark mode */
    //           box-shadow: none; /* No shadow in dark mode */
    //         }
    //         .header {
    //           background-color: #555; /* Dark header background color */
    //         }
    //         .content {
    //           color: #fff; /* Light text color in dark mode */
    //         }
    //         .footer {
    //           background-color: #orange; /* Dark footer background color */
    //         }
    //       }
    //     </style>
    //   </head>
    //   <body>
    //     <div class="container">
    //       <div class="header">
    //       <p>CopyCube</p>
    //         <h1>Investment Deposit</h1>
    //       </div>
         
    //       <div class="content">
    //       <p>
    //       Your Deposit of $${body?.amount} has been recorded and will be approved by the admin.
    //       </p>   
    //       </div>
    //       <div class="footer">
    //         <p>Thank you for choosing our service!</p>
    //       </div>s
    //     </div>
    //   </body>
    //   </html>
    //   `,
    // });
    // wallet.balance = wallet.balance + Number(deposit.amount);
    // await wallet.save();

    return new Response(JSON.stringify({ success: true, deposit }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    if ((error.code = 11000 && error.keyPattern && error.keyValue)) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exist" }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
