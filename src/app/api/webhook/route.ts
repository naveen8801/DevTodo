import { handleVerifyGithubSignature } from "@/utils/GithubAPIUtils";

export async function POST(req: Request) {
  try {
    const eventData = await req.json();
    const eventType = req.headers.get("X-GitHub-Event");
    console.log({ eventType });
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

    // Handle `push` or `pull_request` event type
    if (
      eventType === "push" ||
      (eventType === "pull_request" &&
        ["opened", "synchronize"].includes(eventData?.action))
    ) {
      return Response.json({ msg: "Event handled" }, { status: 200 });
    }

    // Else send `Event not handled` message
    return Response.json({ msg: "Event not handled" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ msg: error?.toString() }, { status: 500 });
  }
}