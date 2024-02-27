import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const githubAPI = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

const authorizationConf = (access_token: string) => {
  return {
    headers: {
      authorization: `token ${access_token}`,
    },
  };
};

export async function GET(req: NextApiRequest) {
  try {
    const { searchParams } = new URL(req.url!);
    const installation_id = searchParams.get("installation_id");
    if (!installation_id) {
      return Response.json(
        { msg: "No installation Id passed" },
        { status: 500 }
      );
    }
    const token = await getToken({ req });
    if (token?.accessToken) {
      const res = await githubAPI.get(
        `user/installations/${installation_id}/repositories`,
        authorizationConf(token.accessToken as string)
      );
      return Response.json({ msg: res?.data }, { status: 200 });
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
