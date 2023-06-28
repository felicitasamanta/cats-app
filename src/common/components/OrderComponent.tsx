import classes from "../styles/Filters.module.css";
import { getOrderName } from "../../common/helpers/getOrderName";
import { useQueryParams } from "../hooks/useQueryParams";
import { Order } from "../model";

type OrderComponentProps = {
  isLoading: boolean;
};
const OrderComponent: React.FC<OrderComponentProps> = ({ isLoading }) => {
  const { params, setQueryParams } = useQueryParams();
  const { order } = params;

  const onOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const queryParams = { ...params };
    delete queryParams.page;
    setQueryParams({ ...queryParams, order: event.target.value as Order });
  };

  return (
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
  );
};
export { OrderComponent };
