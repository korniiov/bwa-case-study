import { useFormik } from 'formik';
import ISearchData from '../../api/interfaces/ISearchData';
import SEARCH_TYPE from '../../enum/searchType';
import addSearchTypeToSearchText from '../../helpers/addSearchTypeToSearchText';
import searchSchema from './searchSchema';

interface ISearchProps {
  onSubmit: (data: ISearchData) => void,
  isLoading?: boolean
}

const Search = ({ onSubmit, isLoading }: ISearchProps) => {
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      text: '',
      type: SEARCH_TYPE.USER
    },
    validationSchema: searchSchema,
    onSubmit: values => {
      const preparedText = addSearchTypeToSearchText(values.text, values.type);
      onSubmit({ text: preparedText });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div>
          <input type="radio" id="user" name="type" value={SEARCH_TYPE.USER} onChange={formik.handleChange} checked={formik.values.type === SEARCH_TYPE.USER} />
          <label htmlFor="user">User</label>
        </div>

        <div>
          <input type="radio" id="corporation" name="type" value={SEARCH_TYPE.ORGANIZATION} onChange={formik.handleChange} checked={formik.values.type === SEARCH_TYPE.ORGANIZATION} />
          <label htmlFor="corporation">Corporation</label>
        </div>
      </div>
      <div>
        <input
          required
          id="text"
          name="text"
          type="text"
          value={formik.values.text}
          onChange={formik.handleChange}
        />
        {
          (formik.touched.text && Boolean(formik.errors.text)) && (
            <span>{formik.errors.text}</span>
          )
        }
      </div>
      <button type="submit" disabled={isLoading}>submit</button>
    </form>
  )
}

export default Search;
