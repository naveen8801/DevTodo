import moment from "moment";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import axios from "axios";
import connectDB from "./ConnectDB";
import User from "@/User";

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
export const getJWT = () => {
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

  // Generate a key pair
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    // publicKeyEncoding: { type: "spki", format: "pem" },
    // privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  const encoded_jwt = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
  });
  return encoded_jwt;
};

/**
 * Retrieves GitHub access tokens for each installation ID and returns them in an array.
 *
 * @return {any[]} Array of GitHub access tokens
 */
const getGithubAccessTokens = async () => {
  const jwt = getJWT();
  const headers = {
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${jwt}`,
  };
  const installationIdsList: string[] = await getAllInstallationIdsFromDB();
  const accessTokenList: any[] = [];
  for (let i = 0; i < installationIdsList?.length; i++) {
    const installationId = installationIdsList[i];
    if (installationId) {
      const url = `https://api.github.com/app/installations/${installationId}/access_tokens`;
      const { data }: any = await axios.post(url, "", { headers });
      accessTokenList.push(data?.token);
    }
  }
  return accessTokenList;
};

/**
 * Retrieves all installation IDs from the database.
 *
 * @return {Array<string>} An array of installation IDs
 */
const getAllInstallationIdsFromDB = async () => {
  await connectDB();
  const users = await User.find();
  return users?.map((u: any) => {
    return u?.installationId || "";
  });
};

export const getAllGithubRepositories = async () => {
  const access_tokens = await getGithubAccessTokens();
  const repositories = [];
  for (let i = 0; i < access_tokens.length; i++) {
    const token = access_tokens[i];
    const headers = {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${token}`,
    };
    const url = `https://api.github.com/installation/repositories`;
    const repos = await axios.get(url, { headers });
    repositories.push(...repos?.data);
  }
  return repositories;
};
