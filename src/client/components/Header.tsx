import * as React from 'react';
import { SVG } from './Logo';

interface HeaderProps {
	auth: boolean;
	logout: React.MouseEventHandler<HTMLButtonElement>;
}
export const Header = (props: HeaderProps) => {
	const logout = (auth: boolean) => {
		if (auth) {
			return (
				<button className="btn" onClick={props.logout}>
					Logout
				</button>
			);
		}
	};
	return (
		<div className="head">
			<SVG className="logo" name="logo" fill="#fff" />
			{logout(props.auth)}
		</div>
	);
};
