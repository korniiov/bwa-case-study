enum SEARCH_TYPE {
  USER = 'user',
  ORGANIZATION = 'organization',
}

export const SEARCH_TYPE_PROPERTIES = {
  [SEARCH_TYPE.ORGANIZATION] : {
    searchValue: '+type:org'
  },
  [SEARCH_TYPE.USER] : {
    searchValue: '+type:user'
  },
}

export default SEARCH_TYPE;
