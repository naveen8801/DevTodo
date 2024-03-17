import { handleVerifyGithubSignature } from "@/utils/GithubAPIUtils";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (handleVerifyGithubSignature(req, body)) {
      return Response.json({ msg: "Unauthorized" }, { status: 401 });
    }
    return Response.json({ msg: "Good" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ msg: error?.toString() }, { status: 500 });
  }
}
