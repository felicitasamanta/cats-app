import { Loader } from "./Loader";

interface Props {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoaderContainer: React.FC<Props> = ({ isLoading, children }) => {
  if (isLoading) return <Loader />;
  return children;
};

export { LoaderContainer };
