import * as React from 'react';

interface RegisterProps {
	email_input: string;
	password_input_one: string;
	password_input_two: string;
	handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
	handleRegister: React.FormEventHandler<HTMLFormElement>;
}

export const Register: React.SFC<RegisterProps> = (props: RegisterProps) => {
	return (
		<div className="register">
			<form onSubmit={e => props.handleRegister(e)}>
				<input type="email" name="email_input" placeholder="email" value={props.email_input} onChange={e => props.handleInputChange(e)} />
				<input type="password" name="password_input_one" placeholder="password" value={props.password_input_one} onChange={e => props.handleInputChange(e)} />
				<input type="password" name="password_input_two" placeholder="re-enter password" value={props.password_input_two} onChange={e => props.handleInputChange(e)} />
				<input type="submit" value={'Submit'} />
			</form>
		</div>
	);
};
