import { handleVerifyGithubSignature } from "@/utils/GithubAPIUtils";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  try {
    // TODO: Add webhook validation
    // if (handleVerifyGithubSignature(req)) {
    // }
    const body = await req.json();
    return Response.json({ msg: "Working" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ msg: error?.toString() }, { status: 500 });
  }
}
