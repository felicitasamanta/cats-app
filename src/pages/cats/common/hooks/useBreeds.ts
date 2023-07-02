import { useQuery } from "react-query";

interface Breed {
  name: string;
  id: string;
}

const useBreeds = () => {
  const fetchBreeds = async () => {
    const response = await fetch(`https://api.thecatapi.com/v1/breeds`);

    const breeds: [] = await response.json();
    return { breeds };
  };
  const { isLoading, isRefetching, data, refetch } = useQuery<{
    breeds: Breed[];
  }>("breeds", fetchBreeds);

  return {
    isLoading: isLoading || isRefetching,
    breeds: data?.breeds,
    refetchBreeds: refetch,
  };
};
export { useBreeds };
