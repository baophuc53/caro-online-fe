import { Children } from "react";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("admin-token") !== null ? (
        <Component {...props}></Component>
      ) : (
        <Redirect to="/admin-login" />
      )
    }
  />
);

export default PrivateRoute;
