import { Route } from "react-router";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) =>{
  const userForgotPassword = localStorage.getItem("otp_token");
  console.log(userForgotPassword);
  return (
    <Route
      {...rest}
      render={(props) =>
        userForgotPassword !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;
