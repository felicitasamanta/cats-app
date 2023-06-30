import { useSearchParams } from "react-router-dom";
import { Order } from "../model";

type Nullable<T> = T | null;

interface QueryParams {
  order?: Order;
  page?: string;
  breed_ids?: string;
  image_id?: string;
}

interface QueryParamsInput {
  order?: Nullable<Order>;
  page?: Nullable<string>;
  breed_ids?: Nullable<string>;
  image_id?: Nullable<string>;
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

  const setQueryParams = (params: QueryParamsInput) => {
    const filteredParams = Object.entries(params).reduce<QueryParams>(
      (acc, [key, value]) => {
        if (value) acc[key as keyof QueryParams] = value;
        return acc;
      },
      {}
    );
    setSearchParams(filteredParams as any);
  };

  const setQueryParam = (key: keyof QueryParams, value: string | number) => {
    setSearchParams({ ...params, [key]: value });
  };

  const removeQueryParam = (key: keyof QueryParams) => {
    const queryParams = { ...params };
    delete queryParams[key];
    setQueryParams(queryParams);
  };

  return {
    searchParams,
    params,
    queryString: searchParams.toString(),
    setQueryParams,
    setQueryParam,
    removeQueryParam,
  };
};

export { useQueryParams };
