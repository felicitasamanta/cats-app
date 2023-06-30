import React from "react";
import classes from "../../../../common/styles/Filters.module.css";
import { useQueryParams } from "../../../../common/hooks/useQueryParams";
import { useBreeds } from "../hooks/useBreeds";

type BreedsProps = {
  isLoading: boolean;
};

const Breeds: React.FC<BreedsProps> = ({ isLoading }) => {
  const { isLoading: isBreedsLoading, breeds } = useBreeds();
  const { params, setQueryParams } = useQueryParams();
  const { breed_ids: breedId } = params;

  const onBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setQueryParams({
      ...params,
      breed_ids: value === "all" ? null : value,
      page: null,
    });
  };

  return (
    <div className={classes.filter}>
      {breeds && (
        <select
          onChange={onBreedChange}
          className={classes.select_btn}
          name="breed"
          id="breed"
          defaultValue={breedId || "all"}
          disabled={isLoading || isBreedsLoading}
        >
          <option value="all">All</option>
          {breeds?.map((breed: any) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export { Breeds };
