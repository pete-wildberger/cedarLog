import * as React from 'react';
import { Route, Redirect, RouteComponentProps, RouteProps } from 'react-router-dom';

type RouteComponent = React.StatelessComponent<RouteComponentProps<{}>> | React.ComponentClass<any>;
interface RoutePropsAuth extends RouteProps {
	auth?: boolean;
}

export const PrivateRoute: React.StatelessComponent<RoutePropsAuth> = ({ component, ...rest }) => {
	const renderFn = (Component?: RouteComponent) => (props: RoutePropsAuth) => {
		if (!Component) {
			return null;
		}

		if (props.auth) {
			return <Component {...props} />;
		}

		const redirectProps = {
			to: {
				pathname: '/',
				state: { from: props.location }
			}
		};

		return <Redirect {...redirectProps} />;
	};

	return <Route {...rest} render={renderFn(component)} />;
};
