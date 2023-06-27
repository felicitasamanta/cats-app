import { useSearchParams } from "react-router-dom";
import { Order } from "../model";

interface QueryParams {
  order?: Order;
  page?: string;
  breed_ids?: string;
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

  const setQueryParams = (params: QueryParams) => {
    setSearchParams(params as any);
  };

  const setQueryParam = (key: keyof QueryParams, value: string | number) => {
    setSearchParams({ ...params, [key]: value });
  };

  return {
    params,
    queryString: searchParams.toString(),
    setQueryParams,
    setQueryParam,
  };
};

export { useQueryParams };
