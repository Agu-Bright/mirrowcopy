import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Trader from "@models/traders";

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
  } else if (session && session?.user?.role !== "admin") {
    return Response.json({ message: "Forbidden request" }, { status: 403 });
  }
  try {
    await connectDB;
    const body = await req.json();
    if (!body)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Incomplete Upload Details",
        }),
        {
          status: 404,
        }
      );

    const trader = await Trader.create({ ...body });

    return new Response(JSON.stringify({ success: true, trader }), {
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
