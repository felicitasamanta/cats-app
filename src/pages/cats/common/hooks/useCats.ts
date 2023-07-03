import { useQuery } from "react-query";
import { Cats } from "../model";
import { useQueryParams } from "@/common/hooks/useQueryParams";

const API_KEY =
  "live_23gBCX5oksoKw4hl4o6DMzmjuh2APvDNxWAAC2Ctrg9zgEcomnY44ce7mSbfuyjF";
export const LIMIT = 10;

const fetchCats = async (queryString: string) => {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${LIMIT}&${queryString}&api_key=${API_KEY}`
    );
    const total = parseInt(response.headers.get("Pagination-Count") as string);
    const cats: Cats = await response.json();
    return { cats, total };
  } catch (err) {
    return { cats: [], total: 0 };
  }
};

const fetchCat = async (imageId: string) => {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/${imageId}?api_key=${API_KEY}`
    );
    const cat = await response.json();
    return { cats: [cat], total: 1 };
  } catch (err) {
    return { cats: [], total: 0 };
  }
};

const useCats = () => {
  const { params, queryString } = useQueryParams();
  const { image_id } = params;

  const getCats = () => fetchCats(queryString);
  const getCat = () => fetchCat(image_id as string);

  const { isLoading, isRefetching, data, refetch } = useQuery(
    "cats",
    image_id ? getCat : getCats,
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
