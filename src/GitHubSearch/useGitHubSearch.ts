import ISearchData from './api/interfaces/ISearchData';
import IUserSearchResponse from './api/interfaces/IUserSearchResponse';
import {ChangeEvent, useState} from 'react';
import SEARCH_TYPE from './enum/searchType';
import IErrorResponse from './api/interfaces/IErrorResponse';
import calculateTotalPages from './helpers/calculateTotalPages';

interface IUseGitHubSearch {
  proxy: (data: ISearchData) => Promise<IUserSearchResponse>
}

const PER_PAGE = 30;

const useGitHubSearch = ({ proxy }: IUseGitHubSearch) => {
  const [response, setResponse] = useState<IUserSearchResponse>();
  const [error, setError] = useState<IErrorResponse | null>(null);
  const [page, setPage] = useState(1);
  const [isFetching, setStatus] = useState(false);
  const [searchObject, setSearchObject] = useState<Omit<ISearchData, 'page'>>({
    text: '',
    type: SEARCH_TYPE.USER,
  });


  const request = async (searchData: ISearchData) => {
    setPage(searchData.page);
    setError(null);
    setStatus(true);
    setSearchObject(searchData);

    proxy(searchData)
      .then(data => {
        setResponse(data);
      })
      .catch(error => {
        setError(error.response.data);
      })
      .finally(() => {
        setStatus(false);
      });
  }

  const onSetPage = (e: ChangeEvent<unknown>, _page: number) => {
    request({ ...searchObject, page: _page });
  }

  const totalPages = calculateTotalPages(response?.total_count, PER_PAGE)

  return {
    isFetching,
    data: response,
    request,
    error: error,
    totalPages,
    page,
    onSetPage,
    searchObject,
  };
}

export default useGitHubSearch;
