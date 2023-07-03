import { Cat } from "./common/model";
import classes from "./common/styles/CatDetail.module.css";
import { CatItem } from "./common/components/CatItem";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { LoaderContainer } from "@/common/components/LoaderContainer";

async function fetchCat(id: string) {
  const response = await fetch(`https://api.thecatapi.com/v1/images/${id}`);
  return response.json();
}
const CatDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, data } = useQuery<Cat>(["cat", id], () =>
    fetchCat(id as string)
  );
  return (
    <div className={classes.container}>
      <LoaderContainer isLoading={isLoading}>
        <CatItem cat={data as Cat} />
      </LoaderContainer>
    </div>
  );
};

export { CatDetail };
