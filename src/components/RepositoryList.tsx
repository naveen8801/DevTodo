import React from "react";

interface IProp {
  installation_id: string;
}

const RepositoryList: React.FC<IProp> = async (
  props
): Promise<React.ReactElement> => {
  const { installation_id } = props;

  //   const {data, error} =

  return <div>RepositoryList</div>;
};

export default RepositoryList;
