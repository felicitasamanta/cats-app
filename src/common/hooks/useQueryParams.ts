import { useSearchParams } from "react-router-dom";
import { Order } from "../model";

interface QueryParams {
  order?: Order;
  page?: string;
  breed_ids?: string;
  image_id?: string;
}

const useQueryParams = () => {
  const [urlSearchParams, setSearchParams] = useSearchParams();
  const searchEntries = Array.from(urlSearchParams.entries()) as [
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
    urlSearchParams,
    params,
    queryString: urlSearchParams.toString(),
    setQueryParams,
    setQueryParam,
    setSearchParams,
  };
};

export { useQueryParams };
