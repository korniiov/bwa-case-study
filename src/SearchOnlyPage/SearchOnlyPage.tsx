import Search from '../core/components/Search';
import SEARCH_TYPE from '../core/enum/searchType';
import {useNavigate, createSearchParams} from 'react-router-dom';
import ISearchData from '../core/api/interfaces/ISearchData';
import {styled} from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

const GridContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SearchOnlyPage = () => {
  const navigate = useNavigate();
  const onSubmit = (data: ISearchData) => {
      navigate({
          pathname: `/search/${data.text}`,
          search: createSearchParams({
              type: data.type
          }).toString()
      });
  }

  return (
    <GridContainer maxWidth="sm">
      <Paper sx={{ width: '100%', p: 2 }}>
          <Search
              onSubmit={onSubmit}
              initialValues={{
                  text: '',
                  type: SEARCH_TYPE.USER,
              }}
          />
      </Paper>
    </GridContainer>
  )
}

export default SearchOnlyPage;
