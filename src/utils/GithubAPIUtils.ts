import moment from "moment";

export const refactorRepositoryList = (repositoryList: any[]) => {
  let repos = repositoryList.map((repo) => {
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
      owner: repo?.owner,
    };
  });
  // Sort by modified_at
  const sorted = repos.sort((a: any, b: any) =>
    moment(b.updated_at).diff(a.updated_at)
  );
  return sorted;
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
      owner: result?.repository?.owner,
      repo: result?.repository?.full_name,
    };
  });
};

export const buildGitHubIssueBody = (data: any): string => {
  const { owner, name, path }: any = data;

  const res = `Hi ${owner?.login || "User"}\n
  \n
  This github issue has been opened to remind you about a TODO in this repository. Please check ${name} at ${path} for more information.
  \n
  Thanks
  DevTODO
  `;

  return res;
};
