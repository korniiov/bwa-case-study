import { githubSearchProxy } from './api/proxy/githubSearchProxy';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

import Search from './components/Search';
import UserList from './components/UserList';

import useGitHubSearch from './useGitHubSearch';

import { styled } from '@mui/material/styles';

const GridContainer = styled(Container)`
  display: grid;
  grid-template-rows: 125px 1fr 50px;
  max-height: 100vh;
  height: 100vh;
`;

const GitHubSearch = () => {
  const controller = useGitHubSearch({ proxy: githubSearchProxy });

  return (
    <GridContainer maxWidth="sm">
      <Search onSubmit={controller.request} isLoading={controller.isFetching} initialValues={controller.searchObject} />
      {
        controller.error ? (
          <Box>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {controller.error.message ?? 'something whent wrong'}
            </Alert>
          </Box>
        ) : (
          <>
            <UserList users={controller.data?.items} isLoading={controller.isFetching}/>
            {
              Boolean(controller.totalPages) && (
                <Pagination count={controller.totalPages} color="primary" page={controller.page} onChange={controller.onSetPage} />
              )
            }
          </>
        )
      }

    </GridContainer>
  )
}

export default GitHubSearch;
