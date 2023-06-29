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
    const queryParams = { ...params };
    delete queryParams.page;

    if (value === "all") delete queryParams.breed_ids;
    else queryParams.breed_ids = value;

    setQueryParams(queryParams);
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
