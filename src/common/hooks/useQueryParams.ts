import { useSearchParams } from "react-router-dom";
import { Order } from "../model";

interface QueryParams {
  order?: Order;
  page?: string;
}

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    order: Order.RAND,
  });
  const searchEntries = Array.from(searchParams.entries()) as [
    keyof QueryParams,
    string
  ][];
  const params = searchEntries.reduce<QueryParams>((acc, [paramKey, value]) => {
    acc[paramKey] = value as any;
    return acc;
  }, {});

  const setSearchParam = (key: keyof QueryParams, value: Order | string) => {
    setSearchParams({ ...params, [key]: value });
  };

  return {
    params,
    queryString: searchParams.toString(),
    setSearchParams,
    setSearchParam,
  };
};

export { useQueryParams };
