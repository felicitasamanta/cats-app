import { useEffect } from "react";
import { Cat } from "./common/components/Cat";
import classes from "./common/styles/Cats.module.css";
import { LoaderContainer } from "../../common/components/LoaderContainer";
import { Order } from "../../common/model";
import { useQueryParams } from "../../common/hooks/useQueryParams";
import { useCats } from "./common/hooks/useCats";
import { getOrderName } from "../../common/helpers/getOrderName";
import { Pagination } from "../../common/components/Pagination";
import { useBreeds } from "./common/hooks/useBreeds";

const Cats = () => {
  const { params, queryString, setQueryParams } = useQueryParams();
  const { isLoading, data, total, refetch } = useCats(queryString);
  const { isBreedsLoading, breeds, refetchBreeds } = useBreeds();
  const { order, page, breed_ids: breedId } = params;

  useEffect(() => {
    refetch();
    refetchBreeds();
  }, [order, page, breedId]);

  const onOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const queryParams = { ...params };
    delete queryParams.page;
    setQueryParams({ ...queryParams, order: event.target.value as Order });
  };
  const onBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const queryParams = { ...params };
    delete queryParams.page;

    if (value === "all") delete queryParams.breed_ids;
    else queryParams.breed_ids = value;

    setQueryParams(queryParams);
  };

  return (
    <div>
      <div className={classes.filter}>
        <select
          onChange={onOrderChange}
          className={classes.select_btn}
          name="order"
          id="order"
          defaultValue={order || "RAND"}
          disabled={isLoading}
        >
          <option value={Order.RAND}>{getOrderName(Order.RAND)}</option>
          <option value={Order.ASC}>{getOrderName(Order.ASC)}</option>
          <option value={Order.DESC}>{getOrderName(Order.DESC)}</option>
        </select>
      </div>
      <div className={classes.filter}>
        {breeds && (
          <select
            onChange={onBreedChange}
            className={classes.select_btn}
            name="breed"
            id="breed"
            defaultValue={breedId || "all"}
            disabled={isBreedsLoading || isLoading}
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
      <div className={classes.filter}>
        <input
          className={classes.select_btn}
          type="text"
          placeholder="Search..."
        />
      </div>
      <LoaderContainer isLoading={isLoading}>
        <ul className={classes.list}>
          {data?.map((cat) => (
            <Cat key={cat.id} cat={cat} />
          ))}
        </ul>
        <Pagination total={total as number} />
      </LoaderContainer>
    </div>
  );
};

export default Cats;
