import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // Get session from server
  const session = await getServerSession();

  // If no session then redirect to login
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8">
      <div className="text-left text-4xl md:text-6xl font-extrabold text-primaryColor">
        Never Miss a <span className="text-black dark:text-white">Todo</span>{" "}
        Comment Again!
      </div>
      <p className=" text-slate-600 dark:text-slate-400 text-justify text-md">
        <strong>DevTodo</strong> is a tool that scans your GitHub repository for
        TODO comments in your code and lists them in an organized manner. With
        DevTodo, you can easily keep track of all the pending TODOs in your
        project, ensuring that nothing slips through the cracks.
      </p>
      <p className="italic text-center">
        "Start using <strong>DevTodo</strong> today and stay on top of your
        project's tasks"
      </p>
    </div>
  );
}
