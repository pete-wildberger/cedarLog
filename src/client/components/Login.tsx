import * as React from 'react';
import { Link } from 'react-router-dom';

interface LoginProps {
	email_input: string;
	password_input_one: string;
	handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
	login: React.FormEventHandler<HTMLFormElement>;
	toggleLogin: React.MouseEventHandler<HTMLButtonElement>;
}

export const Login: React.SFC<LoginProps> = (props: LoginProps) => {
	return (
		<div className="login">
			<form onSubmit={props.login}>
				<input type="email" name="email_input" placeholder="email" value={props.email_input} onChange={e => props.handleInputChange(e)} />
				<input type="password" name="password_input_one" placeholder="password" value={props.password_input_one} onChange={e => props.handleInputChange(e)} />
				<input type="submit" value={'Submit'} />
			</form>
			<button onClick={props.toggleLogin}>Register</button>
		</div>
	);
};
