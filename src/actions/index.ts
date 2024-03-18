import { config } from "@/auth";
import User from "@/User";
import connectDB from "@/utils/ConnectDB";
import {
  buildGitHubIssueBody,
  refactorGetRepoContent,
  refactorRepositoryList,
  refactorRepositorySearchResultList,
} from "@/utils/GithubAPIUtils";
import axios from "axios";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

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

/**
 * Retrieves a user by their email address and returns an object containing either the user data or an error message.
 *
 * @param {string} email - The email address of the user to retrieve
 * @return {Promise<{ data: User } | { error: string }>} An object containing either the user data or an error message
 */
export const handleGetUser = async (email: string) => {
  try {
    connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return { error: "No user found with this email " };
    }
    revalidatePath("/dashboard");
    return { data: user };
  } catch (error) {
    return { error: error!.toString() };
  }
};

/**
 * Function to handle updating user installation ID.
 *
 * @param {string} email - The user's email
 * @param {string} installation_id - The new installation ID
 * @return {Promise<{ data: User } | { error: string }>} The updated user data or an error message
 */
export const handleUpdateUserInstallationId = async (
  email: string,
  installation_id: string
) => {
  try {
    connectDB();
    const user = await User.findOneAndUpdate(
      { email },
      { installationId: installation_id },
      { new: true }
    );
    revalidatePath("/dashboard");
    return { data: user };
  } catch (error) {
    return { error: error!.toString() };
  }
};

/**
 * Function to get all repo from through user's github account (user must have installed DevTodo github app)
 *
 * @param {string} installation_id - The installation ID of github app
 * @return {Promise<{ data: any } | { error: string }>} Response from github API
 */
export const handleGetRepositoryList = async (installation_id: string) => {
  try {
    if (!installation_id) {
      throw new Error("No installation Id passed");
    }
    const { token }: any = await getServerSession(config);
    if (token) {
      const res = await githubAPI.get(
        `user/installations/${installation_id}/repositories`,
        authorizationConf(token as string)
      );
      const repos = refactorRepositoryList(res?.data?.repositories || []);
      return { data: repos };
    } else {
      throw new Error(
        "No access token found. Please sign out and sign in again"
      );
    }
  } catch (error) {
    return { error: error!.toString() };
  }
};

/**
 * Function to search a repo for TODOs comments
 *
 * @param {string} repoId - Name of repo
 * @return {Promise<{ data: any } | { error: string }>} Response from github API
 */
export const handleSearchRepo = async (repoId: string) => {
  try {
    if (!repoId) {
      throw new Error("No repoId passed");
    }
    const { token }: any = await getServerSession(config);
    if (token) {
      const fullRepoId = repoId;
      const res = await githubAPI.get(
        `search/code?q=TODO: +repo:${encodeURIComponent(fullRepoId)}`,
        authorizationConf(token as string)
      );

      const refactoredResult = refactorRepositorySearchResultList(
        res.data?.items || []
      );
      return { data: refactoredResult };
    } else {
      throw new Error(
        "No access token found. Please sign out and sign in again"
      );
    }
  } catch (error) {
    return { error: error!.toString() };
  }
};

/**
 * Retrieves information about a repository.
 *
 * @param {string} repoId - The ID of the repository.
 * @param {string} owner - The owner of the repository.
 * @return {Promise<{ data: any } | { error: string }>} - The repository data or an error message.
 */
export const handleGetRepo = async (repoId: string, owner: string) => {
  try {
    if (!repoId) {
      throw new Error("No repoId passed");
    }
    const { token }: any = await getServerSession(config);
    if (token) {
      const fullRepoId = repoId;
      const res = await githubAPI.get(
        `/repos/${owner}/${repoId}`,
        authorizationConf(token as string)
      );
      const refactoredResult = refactorGetRepoContent(res.data || []);
      return { data: refactoredResult };
    } else {
      throw new Error(
        "No access token found. Please sign out and sign in again"
      );
    }
  } catch (error) {
    return { error: error!.toString() };
  }
};

/**
 * Function to fetch Blob
 *
 * @param {string} blob_url - Blob URL to fetch
 * @return {Promise<{ data: any } | { error: string }>} Response from github API
 */
export const getGithubBlob = async (blob_url: string) => {
  try {
    if (!blob_url) {
      throw new Error("Invalid github blob URL passed");
    }
    const { token }: any = await getServerSession(config);
    if (token) {
      const res = await axios.get(blob_url, authorizationConf(token as string));
      return { data: res.data?.content };
    } else {
      throw new Error(
        "No access token found. Please sign out and sign in again"
      );
    }
  } catch (error) {
    return { error: error!.toString() };
  }
};

export const handleOpenGithubIssueInRepo = async (data: any) => {
  try {
    const owner: string = data?.owner?.login;
    const title: string = `[DevTodo] : Here's a TODO inside ${data?.path}`;
    const repo: string = data?.repo?.split("/")[1];
    const body: string = buildGitHubIssueBody(data);
    let payload = {
      owner,
      repo,
      title,
      body,
      labels: ["DevTODO", "Reminder"],
    };
    const { token }: any = await getServerSession(config);
    if (token) {
      const res = await githubAPI.post(
        `/repos/${owner}/${repo}/issues`,
        payload,
        authorizationConf(token as string)
      );
      return { data: res.data };
    } else {
      throw new Error(
        "No access token found. Please sign out and sign in again"
      );
    }
  } catch (error) {
    console.log(error);
    return { error: error!.toString() };
  }
};

/**
 * Asynchronously enable/disable the scanning of pull requests in the database based on the provided value and repository ID.
 *
 * @param {boolean} val - The value indicating whether to enable or disable pull request scanning
 * @param {string} repoId - The ID of the repository
 * @return {Promise<any>} A promise that resolves to an object containing the scanned pull requests or an error message
 */
export const handlePullRequestScanningInDB = async (
  val: boolean,
  repoId: string
) => {
  try {
    const session: any = await getServerSession(config);
    if (session) {
      await connectDB();
      const { email } = session?.user;
      const existingUser = await User.findOne({
        email,
      });
      if (!existingUser) {
        throw new Error("No user found. Please sign out and sign in again");
      }
      let scan_pull_request = existingUser.scan_pull_request! || [];
      if (val != true && val != false) {
        throw new Error("Unsupported value passed");
      }
      if (val === true) {
        let idx = scan_pull_request.findIndex(
          (i: any) => i?.repoName === repoId
        );
        if (idx === -1) {
          scan_pull_request.push({ repoName: repoId });
        } else {
          throw new Error(
            "Pull request scanning is already enabled for this repository"
          );
        }
      } else if (val === false) {
        let idx = scan_pull_request.findIndex(
          (i: any) => i?.repoName === repoId
        );
        if (idx !== -1) {
          scan_pull_request.splice(idx, 1);
        } else {
          throw new Error(
            "Pull request scanning is not enabled for this repository"
          );
        }
      }
      const newUser = await User.findOneAndUpdate(
        {
          email,
        },
        {
          scan_pull_request,
        }
      );
      revalidatePath(`/dashboard/${repoId}`);
      return { data: "" || [] };
    } else {
      throw new Error(
        "No access token found. Please sign out and sign in again"
      );
    }
  } catch (error) {
    console.log(error);
    return { error: error!.toString() };
  }
};

/**
 * Checks if pull request scanning is enabled for a given repository.
 *
 * @param {string} repoId - The ID of the repository to check for pull request scanning.
 * @return {Object} Object indicating if pull request scanning is enabled or not.
 */
export const checkIfPullRequestScanningEnabled = async (repoId: string) => {
  try {
    const session: any = await getServerSession(config);
    if (session) {
      await connectDB();
      const { email } = session?.user;
      const existingUser = await User.findOne({
        email,
      });
      if (!existingUser) {
        throw new Error("No user found. Please sign out and sign in again");
      }
      let scan_pull_request = existingUser.scan_pull_request! || [];
      let idx = scan_pull_request.findIndex((i: any) => i?.repoName === repoId);
      if (idx === -1) {
        return { pull_request_scanning_enabled: false };
      } else {
        return { pull_request_scanning_enabled: true };
      }
    } else {
      throw new Error(
        "No access token found. Please sign out and sign in again"
      );
    }
  } catch (error) {
    console.log(error);
    return { error: error!.toString() };
  }
};
