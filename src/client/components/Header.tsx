import * as React from 'react';
import { Link } from 'react-router-dom';
import { SVG } from './Logo';

interface HeaderProps {
	logout: React.MouseEventHandler<HTMLLinkElement>;
}
export const Header = (props: HeaderProps) => {
	return (
		<div className="head">
			<SVG className="logo" name="logo" fill="#fff" />
			<Link to="/" onClick={e => props.logout}>
				Logout
			</Link>
		</div>
	);
};
