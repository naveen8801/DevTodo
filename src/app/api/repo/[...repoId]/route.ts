import { refactorRepositoryList } from "@/utils/GithubAPIUtils";
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

export async function GET(
  req: NextApiRequest,
  context: { params: { repoId: string[] } }
) {
  try {
    const repoId = context.params.repoId;
    if (!repoId || repoId.length > 2) {
      return Response.json({ msg: "Invalid repo Id passed" }, { status: 500 });
    }
    const token = await getToken({ req });
    if (token?.accessToken) {
      const fullRepoId = repoId?.join("/");
      const res = await githubAPI.get(
        `search/code?q=TODO+repo:${fullRepoId}`,
        authorizationConf(token.accessToken as string)
      );
      return Response.json({ data: res.data }, { status: 200 });
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
