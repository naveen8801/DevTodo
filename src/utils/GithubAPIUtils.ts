import moment from "moment";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import axios from "axios";
import connectDB from "./ConnectDB";
import User from "@/User";

const githubAPI = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

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
export const handleVerifyGithubSignature = (req: Request, body: any) => {
  const GITHUB_WEBHOOK_SECRET: string = process.env.GITHUB_WEBHOOK_SECRET!;
  const signature = crypto
    .createHmac("sha256", GITHUB_WEBHOOK_SECRET)
    .update(JSON.stringify(body))
    .digest("hex");
  let trusted = Buffer.from(`sha256=${signature}`, "ascii");
  let untrusted = Buffer.from(req.headers.get("x-hub-signature-256")!, "ascii");
  return crypto.timingSafeEqual(trusted, untrusted);
};

/**
 * Generates a JSON Web Token (JWT) for authentication.
 *
 * @return {string} The encoded JWT.
 */
export const getJWT = async () => {
  const now = Math.floor(Date.now() / 1000) - 30;
  const exp = now + 60 * 10; // JWT expiration time (10 minute maximum)
  const payload = {
    // Issued at time
    iat: now,
    // JWT expiration time (10 minutes maximum)
    exp: exp,
    // GitHub App's identifier
    iss: process.env.GITHUB_APP_ID!,
  };

  // Fetch PEM file from cloud storage
  const { data } = await axios.get(process.env.GITHUB_PEM_FILE_URL!);
  const privateKey = data;

  const encoded_jwt = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
  });
  return encoded_jwt;
};

/**
 * Retrieves a GitHub access token for a specific installation ID.
 *
 * @param {string} installation_id - The ID of the installation to retrieve the access token for.
 * @return {Promise<string>} The access token for the specified installation ID.
 */
const getGithubAccessTokenForInstallation = async (installation_id: string) => {
  const jwt = await getJWT();
  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${jwt}`,
  };
  if (installation_id) {
    const url = `https://api.github.com/app/installations/${installation_id}/access_tokens`;
    const { data }: any = await axios.post(url, "", { headers });
    return data?.token;
  }
  return null;
};

/**
 * Retrieves TODOs for a GitHub repository using access token.
 *
 * @param {string} installation_id - The ID of the installation.
 * @param {string} repoId - The ID of the repository.
 * @return {Promise<any>} The refactored result of TODOs for the repository.
 */
export const getTODOsForGithubRepoUsingAccessToken = async (
  installation_id: string,
  repoId: string
) => {
  const access_token = await getGithubAccessTokenForInstallation(
    installation_id
  );
  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${access_token}`,
  };
  const res = await githubAPI.get(
    `search/code?q= TODO: +repo:${encodeURIComponent(repoId)}`,
    { headers }
  );
  const refactoredResult = refactorRepositorySearchResultList(
    res.data?.items || []
  );
  return refactoredResult;
};

/**
 * Function to open a comment on a GitHub pull request.
 *
 * @param {string} installation_id - The installation ID for GitHub.
 * @param {number} pr_number - The pull request number.
 * @param {string} repoId - The repository ID.
 * @param {string} owner - The owner of the repository.
 * @param {string} body - The comment body.
 */
export const openCommentOnGithubPR = async (
  installation_id: string,
  pr_number: number,
  repoId: string,
  owner: string,
  body: string
) => {
  // Get access token
  const access_token = await getGithubAccessTokenForInstallation(
    installation_id
  );
  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${access_token}`,
  };

  const res = await githubAPI.post(
    `/repos/${owner}/${repoId}/issues/${pr_number}/comments`,
    { owner: "DevTODO", body: body, repo: repoId, issue_number: pr_number },
    { headers }
  );
};

/**
 * Searches for TODOs inside files from a GitHub Pull Request.
 *
 * @param {string} installation_id - The installation ID for GitHub access.
 * @param {number} pr_number - The Pull Request number.
 * @param {string} repoId - The repository ID.
 * @param {string} owner - The owner of the repository.
 * @return {Array} An array of objects containing information about files with TODO comments.
 */
export const searchTODOsInsideFilesFromGithubPR = async (
  installation_id: string,
  pr_number: number,
  repoId: string,
  owner: string
) => {
  // Get access token
  const access_token = await getGithubAccessTokenForInstallation(
    installation_id
  );
  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `token ${access_token}`,
  };

  // Get all files from PR
  const res = await githubAPI.get(
    `/repos/${owner}/${repoId}/pulls/${pr_number}/files`,
    { headers }
  );
  const files = res?.data || [];
  let result = [];

  // Get content of each file
  for (let i = 0; i < files?.length; i++) {
    let content_url = files[i]?.contents_url;
    if (content_url) {
      const { data } = await githubAPI.get(content_url, {
        headers,
      });
      result.push({
        name: data?.name,
        path: data?.path,
        data: atob(data?.content || ""),
        url: data?.html_url,
      });
    }
  }

  // Search TODO inside content
  for (let i = 0; i < result.length; i++) {
    let data: any = result[i]?.data;
    if (data?.includes("TODO:")) {
      result[i] = {
        ...result[i],
        isTodoCommentFound: true,
      };
    }
  }
  return {
    totalFilesCount: result?.length,
    filesWithTODOs: result?.filter((f: any) => f?.isTodoCommentFound === true),
  };
};
