import loader from "@common/assets/loading.gif";
import classes from "@common/styles/Loader.module.css";
const Loader = () => {
  return (
    <div className={classes.loader}>
      <div>
        <img src={loader} className={classes.img} alt="Loader" />
      </div>
    </div>
  );
};
export { Loader };
