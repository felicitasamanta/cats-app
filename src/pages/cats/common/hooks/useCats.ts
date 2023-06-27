import { useQuery } from "react-query";
import { Cats } from "../model";

export const LIMIT = 10;

const useCats = (queryString: string) => {
  const fetchCats = async () => {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${LIMIT}&${queryString}&api_key=live_23gBCX5oksoKw4hl4o6DMzmjuh2APvDNxWAAC2Ctrg9zgEcomnY44ce7mSbfuyjF`
    );
    const total = parseInt(response.headers.get("Pagination-Count") as string);
    const cats: Cats = await response.json();
    return { cats, total };
  };
  const { isLoading, isRefetching, data, refetch } = useQuery(
    "cats",
    fetchCats,
    {
      cacheTime: 0,
    }
  );

  return {
    isLoading: isLoading || isRefetching,
    data: data?.cats,
    total: data?.total,
    refetch,
  };
};
export { useCats };
