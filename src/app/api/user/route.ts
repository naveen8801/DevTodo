import User from "@/Models/User";
import connectDB from "@/utils/ConnectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session || !session.user) {
    return NextResponse.json({ msg: "Unauthorized" });
  }
  const email = session.user.email;
  connectDB();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { msg: "No user with this email" },
        { status: 401 }
      );
    }
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
