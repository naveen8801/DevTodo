import User from "@/User";
import { getTODOsForGithubReposUsingAccessToken } from "@/utils/GithubAPIUtils";
import type { NextRequest } from "next/server";

// 0 19 * * 5 - 7 days cron at 7:00 PM
// TODO: Weekly report CRON JOB
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  // Get all users from DB
  const users = await User.find();

  // Get list of all installation IDs with repoIds enabled for weekly report
  const installationIdsWithRepos = users.map((user: any) => ({
    id: user.installationId,
    repos: user?.weekly_email_report?.map((repo: any) => repo?.repoName) || [],
  }));

  // Get TODOs for each installation ID
  const mainResult = [];
  for (const item of installationIdsWithRepos) {
    const result = await getTODOsForGithubReposUsingAccessToken(
      item.id,
      item.repos
    );
    mainResult.push(result);
  }

  return Response.json({ success: true });
}
