import { useQueryParams } from "@common/hooks/useQueryParams";
import { Dropdown, Option, Options } from "./Dropdown";
import { Order } from "../model";

type Props = {
  isLoading: boolean;
};
const OrderPicker: React.FC<Props> = ({ isLoading }) => {
  const { params, setQueryParams } = useQueryParams();
  const { order } = params;

  const orderOptions: Options = [
    {
      name: "Random",
      value: Order.RAND,
      selected: order === Order.RAND,
    },
    {
      name: "Ascending",
      value: Order.ASC,
      selected: order === Order.ASC,
    },
    {
      name: "Descending",
      value: Order.DESC,
      selected: order === Order.DESC,
    },
  ];

  const onChange = (option: Option) => {
    console.log("change", option);
    setTimeout(() => {
      setQueryParams({
        ...params,
        order: option.value,
        page: null,
      });
    });
  };

  return (
    <Dropdown
      options={orderOptions}
      isDisabled={isLoading}
      onChange={onChange}
      placeHolder="Order"
      preselect
    />
  );
};
export { OrderPicker };
