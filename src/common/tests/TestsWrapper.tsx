import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

const TestsWrapper = (props: any) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{props.children}</BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export { TestsWrapper };
