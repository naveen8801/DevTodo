export const refactorRepositoryList = (repositoryList: any[]) => {
  console.log({ repositoryList });
  return repositoryList.map((repo) => {
    return {
      id: repo?.id,
      name: repo?.name,
      description: repo.description || "",
      isPrivate: repo?.private,
      url: repo?.html_url,
      created_at: repo?.created_at,
      updated_at: repo?.updated_at,
      archived: repo?.archived,
    };
  });
};
