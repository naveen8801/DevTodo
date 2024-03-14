import { getGithubBlob } from "@/actions";
import React from "react";
interface IProp {
  url: string;
}

const BlobViewer: React.FC<IProp> = async (
  props
): Promise<React.ReactElement> => {
  const { url } = props;

  if (!url) {
    return <pre className="">No Data</pre>;
  }

  const { data, error } = await getGithubBlob(url);

  const getContent = (source: string) => {
    const a = getShortFocusedContent(source, "TODO");
    const b = getShortFocusedContent(source, "Todo");
    const c = getShortFocusedContent(source, "todo");
    if (a?.length > 0) {
      return getHighlightedText(a, "TODO");
    } else if (b?.length > 0) {
      return getHighlightedText(b, "Todo");
    } else if (c?.length > 0) {
      return getHighlightedText(c, "todo");
    }
  };

  const getShortFocusedContent = (string: string, target: string) => {
    const firstOcc = string?.indexOf(target);
    const lastOcc = string?.lastIndexOf(target);
    if (firstOcc != -1 && lastOcc != -1) {
      if (firstOcc === lastOcc) {
        const mainString = string.slice(
          firstOcc - 30 > 0 ? firstOcc - 30 : 0,
          firstOcc + 30 < string?.length - 1
            ? firstOcc + 30
            : string?.length - 1
        );
        return mainString?.trim();
      } else {
        const mainString = string.slice(firstOcc, lastOcc + target?.length);
        return mainString?.trim();
      }
    }
    return "";
  };

  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: "bold", color: "#FF4C29" }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="h-fit overflow-auto p-4">
      <pre className="text-xs dark:text-slate-300">
        {data ? getContent(atob(data)) : ""}
      </pre>
    </div>
  );
};

export default BlobViewer;
