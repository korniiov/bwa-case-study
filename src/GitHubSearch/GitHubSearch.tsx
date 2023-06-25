import {useEffect} from 'react';
import {createSearchParams, useNavigate} from 'react-router-dom';
import { githubSearchProxy } from './api/proxy/githubSearchProxy';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

import Search from '../core/components/Search';
import UserList from './components/UserList';

import useGitHubSearch from './useGitHubSearch';

import {useParams,useSearchParams} from 'react-router-dom';
import SEARCH_TYPE from '../core/enum/searchType';
import searchSchema from '../core/components/Search/searchSchema';
import ISearchData from '../core/api/interfaces/ISearchData';

import GitHubSearchContainerUI from './GitHubSearchContainer.ui';

const GitHubSearch = () => {
  const param = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initSearchParams = {
    text: param.searchText ?? '',
    type: (searchParams.get('type') as SEARCH_TYPE) ?? SEARCH_TYPE.USER,
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
    navigate({
      pathname: `/search/${data.text}`,
      search: createSearchParams({
        type: data.type
      }).toString()
    });
    controller.request(data);
  }

  return (
    <GitHubSearchContainerUI maxWidth="sm">
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

    </GitHubSearchContainerUI>
  )
}

export default GitHubSearch;
