import * as React from 'react';
import { SVG } from './Logo';

interface RegisterProps {
  email_input: string;
  password_input_one: string;
  password_input_two: string;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  handleRegister: React.FormEventHandler<HTMLFormElement>;
}

const logoStyles: { [key: string]: string } = {
  display: 'block',
  width: '90%',
  margin: 'auto'
};

export const Register: React.SFC<RegisterProps> = (props: RegisterProps) => {
  return (
    <div className="register">
      <form className="login" onSubmit={e => props.handleRegister(e)}>
        <SVG style={logoStyles} name="logo" fill="#DE3163" />
        <input
          type="email"
          name="email_input"
          placeholder="email"
          value={props.email_input}
          onChange={e => props.handleInputChange(e)}
        />
        <input
          type="password"
          name="password_input_one"
          placeholder="password"
          value={props.password_input_one}
          onChange={e => props.handleInputChange(e)}
        />
        <input
          type="password"
          name="password_input_two"
          placeholder="re-enter password"
          value={props.password_input_two}
          onChange={e => props.handleInputChange(e)}
        />
        <input type="submit" value={'Submit'} />
      </form>
    </div>
  );
};
