import ISearchData from './api/interfaces/ISearchData';
import {useMutation} from '@tanstack/react-query';
import IUserSearchResponse from './api/interfaces/IUserSearchResponse';

interface IUseGitHubSearch {
  proxy: (data: ISearchData) => Promise<IUserSearchResponse>
}
const useGitHubSearch = ({ proxy }: IUseGitHubSearch) => {
  const mutation = useMutation({
    mutationFn: (searchData: ISearchData) => proxy(searchData),
  });

  return mutation;
}

export default useGitHubSearch;
