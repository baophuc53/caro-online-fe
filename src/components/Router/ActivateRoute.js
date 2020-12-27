import { Route } from "react-router";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) =>{
  const isActivate = localStorage.getItem("isActivate");
  console.log(isActivate);
  return (
    <Route
      {...rest}
      render={(props) =>
        isActivate === null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;
