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

  return (
    <div className="h-32 overflow-auto p-4">
      <pre className="text-xs">{atob(data)}</pre>
    </div>
  );
};

export default BlobViewer;
