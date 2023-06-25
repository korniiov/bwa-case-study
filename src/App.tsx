import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GitHubSearch from './GitHubSearch';
import SearchOnlyPage from './SearchOnlyPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/search" element={<SearchOnlyPage />} />
      <Route path="/search/:searchText" element={<GitHubSearch />} />
      <Route path="*" element={<Navigate to="/search" />} />
    </Routes>
  </BrowserRouter>
);

export default App;
