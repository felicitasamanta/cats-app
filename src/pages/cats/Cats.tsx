import { useEffect } from "react";
import { Cat } from "./common/components/Cat";
import classes from "./common/styles/Cats.module.css";
import { LoaderContainer } from "../../common/components/LoaderContainer";
import { useQueryParams } from "../../common/hooks/useQueryParams";
import { useCats } from "./common/hooks/useCats";
import { Pagination } from "../../common/components/Pagination";
import { Search } from "../../common/components/Search";
import { Breeds } from "./common/components/Breeds";
import { useBreeds } from "./common/hooks/useBreeds";
import { OrderComponent } from "../../common/components/OrderComponent";

const Cats = () => {
  const { params, queryString } = useQueryParams();
  const { isLoading, data, total, refetch } = useCats(queryString);
  const { refetchBreeds } = useBreeds();
  const { order, page, breed_ids: breedId, image_id: imageId } = params;

  useEffect(() => {
    refetch();
    refetchBreeds();
  }, [order, page, breedId, imageId]);

  return (
    <div>
      <OrderComponent isLoading={isLoading} />
      <Breeds isLoading={isLoading} />
      <Search />
      <LoaderContainer isLoading={isLoading}>
        <ul className={classes.list}>
          {data?.map((cat) => (
            <Cat key={cat.id} cat={cat} />
          ))}
        </ul>
        {total && total > 10 ? <Pagination total={total as number} /> : ""}
      </LoaderContainer>
    </div>
  );
};

export default Cats;
