import { useEffect } from "react";
import { Cat } from "./common/components/Cat";
import classes from "./common/styles/Cats.module.css";
import { LoaderContainer } from "../../common/components/LoaderContainer";
import { useQueryParams } from "../../common/hooks/useQueryParams";
import { useCats } from "./common/hooks/useCats";
import { Pagination } from "../../common/components/Pagination";
import { Search } from "./common/components/Search";
import { Breeds } from "./common/components/Breeds";
import { OrderComponent } from "../../common/components/OrderComponent";
import { Dropdown, Options } from "../../common/components/Dropdown";
import { Order } from "../../common/model";

const Cats = () => {
  const { params } = useQueryParams();
  const { isLoading, data, total, refetch } = useCats();
  const { order, page, breed_ids: breedId, image_id: imageId } = params;

  const orderOptions: Options = [
    {
      name: "Random",
      value: Order.RAND,
      selected: true,
    },
    {
      name: "Ascending",
      value: Order.ASC,
    },
    {
      name: "Descending",
      value: Order.DESC,
    },
  ];

  useEffect(() => {
    refetch();
  }, [order, page, breedId, imageId]);

  return (
    <div>
      <Dropdown options={orderOptions} disabled={isLoading} />
      <OrderComponent isLoading={isLoading} />
      <Breeds isLoading={isLoading} />
      <Search />
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
