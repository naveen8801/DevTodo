import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const authorizationConf = (access_token: string) => {
  return {
    headers: {
      Accept: "application/vnd.github.v3+json",
      authorization: `token ${access_token}`,
    },
  };
};

export async function GET(req: NextApiRequest) {
  try {
    const { searchParams } = new URL(req.url!);
    const blob_url = searchParams.get("blob_url");
    if (!blob_url) {
      return Response.json(
        { msg: "Invalid github blob URL passed" },
        { status: 500 }
      );
    }
    const token = await getToken({ req });
    if (token?.accessToken) {
      const res = await axios.get(
        blob_url,
        authorizationConf(token.accessToken as string)
      );
      return Response.json({ data: res.data?.content }, { status: 200 });
    } else {
      return Response.json(
        { msg: "No access token found. Please sign out and sign in again" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json({ msg: error?.toString() }, { status: 500 });
  }
}
