import * as React from "react";
import { Link } from "react-router-dom";

interface LoginProps {
  email_input: string;
  password_input_one: string;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  login: React.FormEventHandler<HTMLFormElement>;
  toggleLogin: React.MouseEventHandler<HTMLButtonElement>;
}

export const Login: React.SFC<LoginProps> = (props: LoginProps) => {
  return (
    <div className="row vert">
      <div className="col-4">
        <form className="login" onSubmit={props.login}>
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
          <button className="btn" onClick={props.toggleLogin}>
            Register
          </button>
          <input className="btn" type="submit" value={"Login"} />
        </form>
      </div>
    </div>
  );
};
