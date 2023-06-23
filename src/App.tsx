import GitHubSearch from './GitHubSearch';
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GitHubSearch />
  </QueryClientProvider>
);

export default App;
