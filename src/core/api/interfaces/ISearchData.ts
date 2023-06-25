import SEARCH_TYPE from '../../enum/searchType';

interface ISearchData {
  text: string,
  type: SEARCH_TYPE,
  page: number,
}

export default ISearchData;
