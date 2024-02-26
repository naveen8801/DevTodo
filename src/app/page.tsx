import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-8">
      <div className="text-left text-4xl md:text-6xl font-extrabold text-primaryColor">
        Never Miss a <span className="text-black dark:text-white">Todo</span>{" "}
        Comment Again!
      </div>
      <p className=" text-slate-600 dark:text-slate-400 text-justify text-md">
        <strong>DevTodo</strong> is a simple tool that scans your GitHub
        repository for TODO comments in your code and lists them in an organized
        manner. With Todo Finder, you can easily keep track of all the pending
        tasks in your project, ensuring that nothing slips through the cracks.
      </p>
      <p className="italic text-center">
        "Start using <strong>DevTodo</strong> today and stay on top of your
        project's tasks"
      </p>
      <div className="px-4 py-2 bg-buttonBgColor rounded-lg text-black flex items-center justify-center gap-2 hover:cursor-pointer hover:font-medium">
        <FaGithub size={20} />
        Let's Go
      </div>
    </div>
  );
}
