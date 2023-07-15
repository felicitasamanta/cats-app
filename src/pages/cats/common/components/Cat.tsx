import * as Types from "../model";
import classes from "../styles/Cat.module.css";
import { Link } from "react-router-dom";

interface CatProps {
  cat: Types.Cat;
}

const Cat: React.FC<CatProps> = ({ cat }) => {
  return (
    <li className={classes.container} data-testid="cat">
      <Link to={`/cats/${cat.id}`}>
        <img className={classes.img} src={cat.url} alt={`Cat ${cat.id}`} />
      </Link>
    </li>
  );
};
export { Cat };
