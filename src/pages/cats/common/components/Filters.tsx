import { OrderPicker } from "@/common/components/OrderPicker";
import { BreedPicker } from "./BreedPicker";
import { Search } from "./Search";
import classes from "@pages/cats/common/styles/Filters.module.css";

type Props = {
  isLoading: boolean;
};

const Filters: React.FC<Props> = ({ isLoading }) => {
  return (
    <div className={classes.container}>
      <Search />
      <OrderPicker isLoading={isLoading} />
      <BreedPicker isLoading={isLoading} />
    </div>
  );
};
export { Filters };
