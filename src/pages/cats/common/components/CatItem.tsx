import * as Types from "../model";
import classes from "../styles/CatItems.module.css";

const CatItem: React.FC<{ cat: Types.Cat }> = (props) => {
  return (
    <div className={classes.container}>
      <img className={classes.img} src={props.cat.url} alt={props.cat.id}></img>
    </div>
  );
};

export { CatItem };
