import moment from "moment";
import * as crypto from "crypto";

export const refactorRepositoryList = (repositoryList: any[]) => {
  let repos = repositoryList.map((repo) => {
    return {
      id: repo?.id,
      name: repo?.name,
      fullName: repo?.full_name,
      description: repo.description || "",
      isPrivate: repo?.private,
      url: repo?.html_url,
      created_at: repo?.created_at,
      updated_at: repo?.updated_at,
      archived: repo?.archived,
      owner: repo?.owner,
    };
  });
  // Sort by modified_at
  const sorted = repos.sort((a: any, b: any) =>
    moment(b.updated_at).diff(a.updated_at)
  );
  return sorted;
};

export const refactorRepositorySearchResultList = (
  repositorySearchList: any[]
) => {
  return repositorySearchList.map((result) => {
    return {
      id: result?.sha,
      name: result?.name,
      path: result?.path,
      url: result?.html_url,
      git_url: result?.git_url,
      owner: result?.repository?.owner,
      repo: result?.repository?.full_name,
    };
  });
};

export const buildGitHubIssueBody = (data: any): string => {
  const { owner, name, path, url }: any = data;

  const res = `Hi **${owner?.login}**,

This github issue has been opened to remind you about a TODO in this repository. Please check ${name} at [${path}](${url}) for more information.

Thanks
Issue Created using **[DevTODO](${process.env.APP_URL})**
  `;

  return res;
};

/**
 * Verifies the Github signature of the incoming request.
 *
 * @param {Request} req - the incoming request object
 * @return {boolean} true if the signature is verified, false otherwise
 */
export const handleVerifyGithubSignature = (req: Request) => {
  const GITHUB_WEBHOOK_SECRET: string = process.env.GITHUB_WEBHOOK_SECRET!;
  const signature = crypto
    .createHmac("sha256", GITHUB_WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");
  let trusted = Buffer.from(`sha256=${signature}`, "ascii");
  let untrusted = Buffer.from(req.headers.get("x-hub-signature-256")!, "ascii");
  return crypto.timingSafeEqual(trusted, untrusted);
};
