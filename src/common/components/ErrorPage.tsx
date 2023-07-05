import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Link data-testid="link" to="/home">
        GO HOME
      </Link>
    </div>
  );
};

export { ErrorPage };
