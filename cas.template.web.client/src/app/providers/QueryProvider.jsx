/**
 * QueryProvider - Manages React Query configuration
 * Single Responsibility: Handles data fetching and caching layer
 */
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const DEFAULT_STALE_TIME = 5 * 60 * 1000; // 5 minutes
const DEFAULT_CACHE_TIME = 10 * 60 * 1000; // 10 minutes

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME,
        gcTime: DEFAULT_CACHE_TIME,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        console.error("Query Error:", error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        console.error("Mutation Error:", error);
      },
    }),
  });
};

const setupPersistence = (queryClient) => {
  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  persistQueryClient({
    queryClient,
    persister,
    maxAge: DEFAULT_CACHE_TIME,
  });
};

export const QueryProvider = ({ children }) => {
  const queryClient = createQueryClient();
  setupPersistence(queryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
