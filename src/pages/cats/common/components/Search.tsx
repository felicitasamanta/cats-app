import { useQueryParams } from "../../../../common/hooks/useQueryParams";
import classes from "../../../../common/styles/Filters.module.css";

// import { useSearch } from "../../pages/cats/common/hooks/useSearch";

const Search = () => {
  const { params, setQueryParams } = useQueryParams();
  const { image_id: imageId } = params;

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const queryParams = { ...params };

    setQueryParams({ ...queryParams, image_id: value });
  };

  return (
    <div className={classes.filter}>
      <input
        className={classes.select_btn}
        onChange={onSearchChange}
        placeholder="Search..."
        name="search"
        id="search"
        defaultValue={imageId || ""}
      />
    </div>
  );
};

export { Search };
