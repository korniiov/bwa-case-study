import { githubSearchProxy } from './api/proxy/githubSearchProxy';

import Search from './components/Search';
import UserList from './components/UserList';

import useGitHubSearch from './useGitHubSearch';

const GitHubSearch = () => {
  const controller = useGitHubSearch({ proxy: githubSearchProxy });

  return (
    <section>
      <Search onSubmit={controller.mutate} isLoading={controller.isLoading} />
      <UserList users={controller.data?.items} />
    </section>
  )
}

export default GitHubSearch;
