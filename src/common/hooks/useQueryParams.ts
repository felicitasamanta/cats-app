import { useSearchParams } from "react-router-dom";
import { Order } from "../model";

interface QueryParams {
  order?: Order;
  page?: string;
}

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchEntries = Array.from(searchParams.entries()) as [
    keyof QueryParams,
    string
  ][];
  const params = searchEntries.reduce<QueryParams>((acc, [paramKey, value]) => {
    acc[paramKey] = value as any;
    return acc;
  }, {});

  const setQueryParam = (
    key: keyof QueryParams,
    value: Order | string | number
  ) => {
    setSearchParams({ ...params, [key]: value });
  };

  return {
    params,
    queryString: searchParams.toString(),
    setQueryParams: setSearchParams,
    setQueryParam,
  };
};

export { useQueryParams };
