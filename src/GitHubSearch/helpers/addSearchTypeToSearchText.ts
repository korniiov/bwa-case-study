import SEARCH_TYPE, {SEARCH_TYPE_PROPERTIES} from '../enum/searchType';

const addSearchTypeToSearchText = (text: string, type: SEARCH_TYPE) => {
  return `${text}${SEARCH_TYPE_PROPERTIES[type].searchValue}`
}

export default addSearchTypeToSearchText;
