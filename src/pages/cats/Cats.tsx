import { useEffect } from "react";
import { Cat } from "./common/components/Cat";
import classes from "./common/styles/Cats.module.css";
import { useCats } from "./common/hooks/useCats";
import { Filters } from "./common/components/Filters";
import { useQueryParams } from "@/common/hooks/useQueryParams";
import { LoaderContainer } from "@/common/components/LoaderContainer";
import { Pagination } from "@/common/components/Pagination";

const Cats = () => {
  const { params } = useQueryParams();
  const { isLoading, data, total, refetch } = useCats();
  const { order, page, breed_ids: breedId, image_id: imageId } = params;

  useEffect(() => {
    refetch();
  }, [order, page, breedId, imageId]);

  return (
    <div>
      <Filters isLoading={isLoading} />
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
