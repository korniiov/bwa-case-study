import SEARCH_TYPE, {SEARCH_TYPE_PROPERTIES} from '../enum/searchType';

const addSearchTypeToSearchText = (text: string, type: SEARCH_TYPE) => {
  switch (type) {
    case SEARCH_TYPE.ORGANIZATION:
      return `${text}${SEARCH_TYPE_PROPERTIES[SEARCH_TYPE.ORGANIZATION].searchValue}`
    default:
      return text
  }
}

export default addSearchTypeToSearchText;
