import * as Yup from 'yup';
import githubUsernameRegex from 'github-username-regex';
import SEARCH_TYPE from "../../enum/searchType";

const searchSchema = Yup.object().shape({
  text: Yup.string()
    .max(38, 'Too Long!')
    .test(
      'format',
      'Usernames can only contain alphanumeric characters and dashes, and could not start or finished with dashes',
      (text = '') => githubUsernameRegex.test(text))
    .required('Required'),
  type: Yup.string().oneOf(Object.values(SEARCH_TYPE))
    .required('Required'),
});

export default searchSchema;
