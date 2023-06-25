import * as Types from "./models/model";
import { Cat } from "./components/Cat";
import classes from "./styles/Cats.module.css";
import { useQuery } from "react-query";
import { LoaderContainer } from "./helpers/LoaderContainer";
import { Order } from "../../common/model";
import { useEffect } from "react";
import { useQueryParams } from "../../common/hooks/useQueryParams";

const Cats = () => {
  const { params, queryString, setSearchParam } = useQueryParams();
  const order = params.order;

  const fetchCats = async () => {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10&${queryString}&api_key=live_23gBCX5oksoKw4hl4o6DMzmjuh2APvDNxWAAC2Ctrg9zgEcomnY44ce7mSbfuyjF`
    );
    return response.json();
  };

  const { isLoading, isRefetching, data, refetch } = useQuery<Types.Cats>(
    "cats",
    fetchCats,
    {
      cacheTime: 0,
    }
  );
  const loading = isLoading || isRefetching;

  const onChange = (event: any) => {
    const value = event.target.value;
    setSearchParam("order", value);
  };

  useEffect(() => {
    refetch();
  }, [order]);

  return (
    <div>
      <div className={classes.filter_order}>
        <select
          onChange={onChange}
          className={classes.select_btn}
          name="order"
          id="order"
          defaultValue="RAND"
          disabled={loading}
        >
          <option value="RAND">{Order.RAND}</option>
          <option value="ASC">{Order.ASC}</option>
          <option value="DESC">{Order.DESC}</option>
        </select>
      </div>
      <LoaderContainer isLoading={loading}>
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
