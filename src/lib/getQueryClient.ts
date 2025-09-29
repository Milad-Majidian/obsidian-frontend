import { QueryClient } from "@tanstack/react-query";

let client: QueryClient | null = null;

export default function getQueryClient() {
  if (!client) {
    client = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1, // retry failed queries once
          refetchOnWindowFocus: false, // prevent refetching every time user focuses tab
        },
      },
    });
  }
  return client;
}
