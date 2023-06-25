import ISearchData from '../../../core/api/interfaces/ISearchData';
import addSearchTypeToSearchText from '../../helpers/addSearchTypeToSearchText';
import axios from 'axios';

export const githubSearchProxy = ({ text, type, page = 1 }: ISearchData) =>
{
  const preparedText = addSearchTypeToSearchText(text, type);

  return axios(`https://api.github.com/search/users?q=${preparedText}&page=${page}`, {
    headers: {
      Accept: 'application/vnd.github+json',
    }
  })
    .then(response => response.data)
}
