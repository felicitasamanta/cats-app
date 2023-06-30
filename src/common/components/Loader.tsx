import loader from "../assets/loading.gif";
import classes from "../styles/Loader.module.css";
const Loader = () => {
  return (
    <div className={classes.loader}>
      <div>
        <h1>Loading...</h1>
        <img src={loader} className={classes.img} alt="Loader" />
      </div>
    </div>
  );
};
export { Loader };
