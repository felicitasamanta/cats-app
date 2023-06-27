import { Cat } from "./common/components/Cat";
import classes from "./common/styles/Cats.module.css";
import { LoaderContainer } from "../../common/components/LoaderContainer";
import { Order } from "../../common/model";
import { useEffect } from "react";
import { useQueryParams } from "../../common/hooks/useQueryParams";
import { useCats } from "./common/hooks/useCats";
import { getOrderName } from "../../common/helpers/getOrderName";
import { Pagination } from "../../common/components/Pagination";

const Cats = () => {
  const { params, queryString, setQueryParams } = useQueryParams();
  const { isLoading, data, total, refetch } = useCats(queryString);
  const { order, page } = params;

  useEffect(() => {
    refetch();
  }, [order, page]);

  const onOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const queryParams = { ...params };
    delete queryParams.page;
    setQueryParams({ ...queryParams, order: event.target.value });
  };

  return (
    <div>
      <div className={classes.filter_order}>
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
