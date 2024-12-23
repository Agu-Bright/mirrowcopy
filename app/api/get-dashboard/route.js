import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Profit from "@models/Profit";
import User from "@models/user";
import Order from "@models/order";
import Deposit from "@models/Deposit";
import Log from "@models/log";
import Wallet from "@models/wallet";

export const GET = async (req, res) => {
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
    // Get the current date at midnight (start of the day)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Get the next day at midnight (end of the day)
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    //get total users
    const users = await User.find().countDocuments();
    //get todays orders

    const result = await Wallet.aggregate([
      {
        $group: {
          _id: null, // We don't need to group by any specific field
          totalBalance: { $sum: "$balance" }, // Summing the 'balance' field
        },
      },
    ]);

    // Extract total balance from result
    const totalBalance = result[0]?.totalBalance || 0;
    console.log("Total Balance:", totalBalance);

    const orders = await Order.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    }).countDocuments();
    //get todays deposits
    const deposits = await Deposit.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    }).countDocuments();
    //get all logs
    const logs = await Log.find().countDocuments();

    return new Response(
      JSON.stringify({
        success: true,
        dashboard: { users, orders, deposits, logs, totalBalance },
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
