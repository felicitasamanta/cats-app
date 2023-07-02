import React from "react";
import { useQueryParams } from "../../../../common/hooks/useQueryParams";
import { useBreeds } from "../hooks/useBreeds";
import {
  Dropdown,
  Option,
  Options,
} from "../../../../common/components/Dropdown";

type BreedsProps = {
  isLoading: boolean;
};

const Breeds: React.FC<BreedsProps> = ({ isLoading }) => {
  const { isLoading: isBreedsLoading, breeds } = useBreeds();
  const { params, setQueryParams } = useQueryParams();
  const { breed_ids: breedId } = params;

  const options: Options =
    breeds?.map(({ id, name }) => ({
      name,
      value: id,
      selected: id === breedId,
    })) || [];

  options.unshift({
    name: "All",
    value: "all",
  });

  const onChange = (option: Option) => {
    setQueryParams({
      ...params,
      breed_ids: option.value === "all" ? null : option.value,
      page: null,
    });
  };

  return (
    <Dropdown
      options={options}
      isLoading={isLoading || isBreedsLoading}
      placeHolder="Breeds"
      preselect
      onChange={onChange}
    />
  );
};

export { Breeds };
