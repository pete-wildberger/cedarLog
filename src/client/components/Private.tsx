import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
  auth: boolean;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, auth, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps =>
        auth ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: routeProps.location }
            }}
          />
        )
      }
    />
  );
};

// interface RouteComponentPropsAuth extends RouteComponentProps{
//   auth?: boolean;
//   user?: { [key: string]: any };
// }
// interface RoutePropsAuth extends RouteProps {
//   auth?: boolean;
//   user?: { [key: string]: any };
// }
// type RouteComponent = React.StatelessComponent<RouteComponentProps<{}>> | React.ComponentClass<RoutePropsAuth, any>;

// export const PrivateRoute: React.StatelessComponent<RoutePropsAuth> = ({ component, ...rest }) => {
//   const renderFn = (Component?: RouteComponent) => (props: RoutePropsAuth) => {
//     if (!Component) {
//       return null;
//     }
//     // const user = JSON.parse(sessionStorage.getItem("user"));
//     if (props.user !== null && props.user.auth) {
//       return <Component {...props} />;
//     }

//     const redirectProps = {
//       to: {
//         pathname: '/',
//         state: { from: props.location }
//       }
//     };

//     return <Redirect {...redirectProps} />;
//   };

//   return <Route {...rest} render={renderFn(component)} />;
// };
