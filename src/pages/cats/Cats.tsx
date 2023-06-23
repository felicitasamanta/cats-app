import * as Types from "./models/model";
import { Cat } from "./components/Cat";
import classes from "./styles/Cats.module.css";
import { useQuery } from "react-query";
import { LoaderContainer } from "./helpers/LoaderContainer";

const fetchCats = async () => {
  const response = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=10"
  );
  return response.json();
};

const Cats = () => {
  const { isLoading, data } = useQuery<Types.Cats>("cats", fetchCats, {
    cacheTime: 0,
  });

  return (
    <LoaderContainer isLoading={isLoading}>
      <ul className={classes.list}>
        {data?.map((cat) => (
          <Cat key={cat.id} cat={cat} />
        ))}
      </ul>
    </LoaderContainer>
  );
};

export default Cats;
