import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProjectTrackerPage from './features/project-tracker/ProjectTrackerPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProjectTrackerPage />
    </QueryClientProvider>
  );
}

export default App;
