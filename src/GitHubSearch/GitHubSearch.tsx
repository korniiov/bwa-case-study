import {useEffect} from 'react';
import {useNavigate} from 'react-router';
import { githubSearchProxy } from './api/proxy/githubSearchProxy';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

import Search from '../core/components/Search';
import UserList from './components/UserList';

import useGitHubSearch from './useGitHubSearch';

import { styled } from '@mui/material/styles';
import {useParams} from 'react-router-dom';
import SEARCH_TYPE from '../core/enum/searchType';
import searchSchema from '../core/components/Search/searchSchema';
import ISearchData from '../core/api/interfaces/ISearchData';

const GridContainer = styled(Container)`
  display: grid;
  grid-template-rows: 125px 1fr 50px;
  max-height: 100vh;
  height: 100vh;
`;

const GitHubSearch = () => {
  const param = useParams();
  const navigate = useNavigate();
  const initSearchParams = {
    text: param.searchText ?? '',
    type: SEARCH_TYPE.USER,
  };

  const controller = useGitHubSearch({ proxy: githubSearchProxy, initSearchParams });

  useEffect(() => {
    const validate = async () => {
      return await searchSchema.validate(initSearchParams);
    }

    validate().then(d => {
      controller.request({...controller.searchObject, page: 1 });
    }).catch(e => {
      console.log(e);
    });
    // eslint-disable-next-line
  }, []);

  const onSubmit = (data: ISearchData) => {
    navigate(`/search/${data.text}`);
    controller.request(data);
  }

  return (
    <GridContainer maxWidth="sm">
      <Search
        validateOnMount
        onSubmit={onSubmit}
        isLoading={controller.isFetching}
        initialValues={controller.searchObject}
      />
      {
        controller.error ? (
          <Box>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {controller.error.message ?? 'something went wrong'}
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
