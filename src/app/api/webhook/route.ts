import User from "@/User";
import connectDB from "@/utils/ConnectDB";
import {
  searchTODOsInsideFilesFromGithubPR,
  handleVerifyGithubSignature,
  openCommentOnGithubPR,
} from "@/utils/GithubAPIUtils";

/**
 * A function to generate the body for a pull request comment.
 *
 * @param {number} totalFiles - the total number of files scanned
 * @param {any} filesWithTODOs - an array of files with TODOs
 * @return {string} the generated message for the pull request comment
 */
const generateBodyForPRComment = (
  totalFiles: number,
  filesWithTODOs: any,
  repoId: string
) => {
  let tmp = "";
  filesWithTODOs?.length > 0
    ? filesWithTODOs?.forEach((file: any) => {
        tmp += `| ${file?.name} | ${file?.path} | [link](${file?.url}) |\n`;
      })
    : "";

  let message = `
  **Total Files Scanned: ${totalFiles}**
  **Files With TODOs: ${filesWithTODOs?.length}**

  ${
    filesWithTODOs?.length > 0
      ? `
  **Details:**

  | File Name | File Path | URL |
  | --- | --- | --- |
  ${tmp}
`
      : ""
  }

  Thanks
  Generated using **[DevTODO](${process.env.APP_URL + `/${repoId}`})**
  `;

  return message;
};

/**
 * Retrieves a user from the database based on the provided installation ID.
 *
 * @param {string} installation_id - The installation ID of the user to retrieve.
 * @return {Promise<User>} The user object corresponding to the installation ID.
 */
const getUserWithInstallationIdFromDB = async (installation_id: string) => {
  await connectDB();
  const existingUser = await User.findOne({
    installationId: installation_id,
  });
  return existingUser;
};

/**
 * Checks if the user has enabled pull request scanning for a specific repository.
 *
 * @param {any} userObj - The user object containing pull request scanning information.
 * @param {string} repoId - The ID of the repository to check.
 * @return {boolean} Returns true if pull request scanning is enabled for the repository, false otherwise.
 */
const checkIfUserHasEnabledPullReqScanningForRepo = async (
  userObj: any,
  repoId: string
) => {
  let idx = userObj?.scan_pull_request?.findIndex(
    (re: any) => re?.repoName === repoId
  );
  return idx !== -1 && idx != undefined;
};

export async function POST(req: Request) {
  try {
    const eventData = await req.json();
    const eventType = req.headers.get("X-GitHub-Event");

    if (!eventType) {
      return Response.json(
        { msg: "Invalid or no event type found !" },
        { status: 403 }
      );
    }

    // If signature verification fails then return `Unauthorized`
    if (!handleVerifyGithubSignature(req, eventData)) {
      return Response.json({ msg: "Unauthorized !" }, { status: 401 });
    }

    // Handle `installation` event type
    if (
      eventType === "installation" &&
      ["created", "deleted", "modified"].includes(eventData?.action)
    ) {
      return Response.json({ msg: "Event not handled" }, { status: 200 });
    }

    // Handle `pull_request` event type
    if (
      eventType === "pull_request" &&
      ["opened", "synchronize"].includes(eventData?.action)
    ) {
      const { repository, installation, number, pull_request } = eventData;
      const { name, full_name, owner } = repository;

      if (!installation || !installation?.id) {
        return Response.json(
          { msg: "Installation not found in the event payload" },
          { status: 200 }
        );
      }

      // Check if user is present with this installation id
      const user = await getUserWithInstallationIdFromDB(installation?.id);
      if (!user) {
        throw new Error("No user found with this installation ID in DB");
      }

      // Check is user has activated pull request scanning feature for this repo
      const isPullRequestScanningEnabled =
        await checkIfUserHasEnabledPullReqScanningForRepo(user, full_name);
      if (!isPullRequestScanningEnabled) {
        return Response.json(
          {
            msg: `User has not enabled pull request scanning for ${full_name}`,
          },
          { status: 200 }
        );
      }

      // Get files with TODOs and total files count
      const { totalFilesCount, filesWithTODOs } =
        await searchTODOsInsideFilesFromGithubPR(
          installation?.id,
          parseInt(number),
          name,
          owner?.login
        );

      // Generate body for github comment
      const body = generateBodyForPRComment(
        totalFilesCount,
        filesWithTODOs,
        full_name
      );

      // Create comment on PR
      const res = await openCommentOnGithubPR(
        installation?.id,
        parseInt(number),
        name,
        owner?.login,
        body
      );
      return Response.json({ msg: "Event handled" }, { status: 200 });
    }

    // Else send `Event not handled` message
    return Response.json({ msg: "Event not handled" }, { status: 200 });
  } catch (error) {
    return Response.json({ msg: error?.toString() }, { status: 500 });
  }
}
