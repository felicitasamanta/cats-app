import { useQuery } from "react-query";

const useBreeds = () => {
  const fetchBreeds = async () => {
    const response = await fetch(`https://api.thecatapi.com/v1/breeds`);

    const breeds: [] = await response.json();
    return { breeds };
  };
  const { isLoading, isRefetching, data, refetch } = useQuery(
    "breeds",
    fetchBreeds,
    {
      cacheTime: 0,
    }
  );

  return {
    isBreedsLoading: isLoading || isRefetching,
    breeds: data?.breeds,
    refetchBreeds: refetch,
  };
};
export { useBreeds };
