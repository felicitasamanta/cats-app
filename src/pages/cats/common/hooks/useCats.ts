import { useQuery } from "react-query";
import { Cats } from "../model";

const useCats = (queryString: string) => {
  const fetchCats = async () => {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10&${queryString}&api_key=live_23gBCX5oksoKw4hl4o6DMzmjuh2APvDNxWAAC2Ctrg9zgEcomnY44ce7mSbfuyjF`
    );
    return response.json();
  };
  const { isLoading, isRefetching, data, refetch } = useQuery<Cats>(
    "cats",
    fetchCats,
    {
      cacheTime: 0,
    }
  );

  return { isLoading: isLoading || isRefetching, data, refetch };
};
export { useCats };
