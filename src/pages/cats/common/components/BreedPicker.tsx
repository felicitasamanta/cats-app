import React from "react";
import { useQueryParams } from "@/common/hooks/useQueryParams";
import { Dropdown, Options, Option } from "@/common/components/Dropdown";
import { useBreeds } from "../hooks/useBreeds";

type Props = {
  isLoading: boolean;
};

const BreedPicker: React.FC<Props> = ({ isLoading }) => {
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

  type NewType = Option;

  const onChange = (option: NewType) => {
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

export { BreedPicker };
