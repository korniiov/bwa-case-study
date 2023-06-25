import Search from '../core/components/Search';
import SEARCH_TYPE from '../core/enum/searchType';
import {useNavigate} from 'react-router';
import ISearchData from '../core/api/interfaces/ISearchData';
import {styled} from '@mui/material/styles';
import Container from '@mui/material/Container';

const GridContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SearchOnlyPage = () => {
  const navigate = useNavigate();
  const onSubmit = (data: ISearchData) => {
    navigate(`/search/${data.text}`);
  }

  return (
    <GridContainer maxWidth="sm">
      <Search
        onSubmit={onSubmit}
        initialValues={{
          text: '',
          type: SEARCH_TYPE.USER,
        }}
      />
    </GridContainer>
  )
}

export default SearchOnlyPage;
