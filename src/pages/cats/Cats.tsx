import { Cat } from "./common/components/Cat";
import classes from "./common/styles/Cats.module.css";
import { LoaderContainer } from "../../common/components/LoaderContainer";
import { Order } from "../../common/model";
import { useEffect } from "react";
import { useQueryParams } from "../../common/hooks/useQueryParams";
import { useCats } from "./common/hooks/useCats";
import { getOrderName } from "../../common/helpers/getOrderName";

const Cats = () => {
  const { params, queryString, setSearchParam } = useQueryParams();
  const { isLoading, data, refetch } = useCats(queryString);
  const order = params.order;

  useEffect(() => {
    refetch();
  }, [order]);

  const onChange = (event: any) => {
    const value = event.target.value;
    setSearchParam("order", value);
  };

  return (
    <div>
      <div className={classes.filter_order}>
        <select
          onChange={onChange}
          className={classes.select_btn}
          name="order"
          id="order"
          defaultValue="RAND"
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
      </LoaderContainer>
    </div>
  );
};

export default Cats;
