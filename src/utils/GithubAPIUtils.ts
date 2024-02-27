export const refactorRepositoryList = (repositoryList: any[]) => {
  return repositoryList.map((repo) => {
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
    };
  });
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
    };
  });
};
