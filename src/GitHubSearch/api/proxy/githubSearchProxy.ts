import ISearchData from '../interfaces/ISearchData';

export const githubSearchProxy = ({ text }: ISearchData) =>
  fetch(`https://api.github.com/search/users?q=${text}`, {
    headers: {
      Accept: 'application/vnd.github+json',
    }
  })
    .then(data => data.json())
