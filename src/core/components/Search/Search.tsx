import { useFormik } from 'formik';

import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';

import ISearchData from '../../api/interfaces/ISearchData';
import SEARCH_TYPE from '../../enum/searchType';

import InlineFormControl from '../../../core/ui/form/InlineFormControl';
import InlineRadioGroup from '../../../core/ui/form/InlineRadioGroup';
import InlineFormLabel from '../../../core/ui/form/InlineFormLabel';
import VerticalForm from '../../../core/ui/form/VerticalForm';

import searchSchema from './searchSchema';

interface ISearchProps {
  onSubmit: (data: ISearchData) => void,
  validateOnMount?: boolean,
  isLoading?: boolean,
  initialValues: Omit<ISearchData, 'page'>,
}

const Search = ({ onSubmit, isLoading, initialValues, validateOnMount = false }: ISearchProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues,
    validationSchema: searchSchema,
    onSubmit: values => {
      onSubmit({ ...values, page: 1 });
    },
  });

  return (
    <VerticalForm onSubmit={formik.handleSubmit}>
      <FormControl>
        <InlineFormControl>
          <InlineFormLabel id="type">Search by:</InlineFormLabel>
          <InlineRadioGroup
              aria-labelledby="search-type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
          >
            <FormControlLabel value={SEARCH_TYPE.USER} control={<Radio />} label="User" />
            <FormControlLabel value={SEARCH_TYPE.ORGANIZATION} control={<Radio />} label="Corporation" />
          </InlineRadioGroup>
        </InlineFormControl>
        <FormHelperText sx={{ mt: -1, ml: 0, mb: 1, color: 'red' }}>{formik.errors.type}</FormHelperText>
      </FormControl>
      <InlineFormControl withBtn>
        <TextField
          inputProps={{
            "data-testid": "search-text",
          }}
          fullWidth
          variant="standard"
          size="small"
          disabled={isLoading}
          name="text"
          label="Search"
          id="text"
          type="text"
          value={formik.values.text}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.text)}
          helperText={formik.errors.text}
        />
        <Button size="large" disabled={isLoading} variant="contained" type="submit" data-testid="submit-btn">
          Submit
        </Button>
      </InlineFormControl>
    </VerticalForm>
  )
}

export default Search;
