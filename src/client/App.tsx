import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";
// import axios from "axios";
import { dug } from './dug';
import history from "./history";
import {
  DashBoard,
  Footer,
  Header,
  Login,
  PrivateRoute,
  Register,
  User
} from "./components/";
// https://tylermcginnis.com/react-router-protected-routes-authentication/

const FourOhFour = () => {
  return <h1>Oh no 404</h1>;
};

interface AppState {
  user?: { [key: string]: any };
  login?: boolean;
  email_input?: string;
  auth?: boolean;
  password_input_one?: string;
  password_input_two?: string;
}

export class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {
        email: ""
      },
      email_input: "",
      auth: false,
      login: true,
      password_input_one: "",
      password_input_two: ""
    };
  }
  clearLoginState = (): void => {
    this.setState({
      email_input: "",
      password_input_one: "",
      password_input_two: ""
    });
  };
  getUser = () => {
    let user;
    this.setState({ user });
  };

  handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.password_input_one !== this.state.password_input_two) {
      this.clearLoginState();
      return;
    } else {
      const creds = {
        email: this.state.email_input,
        password: this.state.password_input_one
      };
      dug
        .post("/register", creds)
        .then(res => {
          console.log(res);
          this.setState({ user: res });
          console.log(this.state);
          this.toggleLogin();
        })
        .catch(err => {
          console.log(err);
        });
      this.clearLoginState();
    }
  };
  login = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const creds = {
      email: this.state.email_input,
      password: this.state.password_input_one
    };
    dug
      .post("/login", creds)
      .then(res => {
        console.log(res);
        if (res.email.length > 0 && res._id > -1) {
          this.setState({ user: res, auth: true });
          console.log(this.props);
          console.log(this.state);
          sessionStorage.setItem("user", JSON.stringify(this.state.user));
          history.push("/dashboard");
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.clearLoginState();
  };
  componentDidMount() {
    console.log("this.context", this.context);
    console.log("this.props", this.props);
  }
  toggleLogin = () => {
    this.setState({
      login: !this.state.login
    });
  };
  render() {
    console.log("email", this.state.user.email.length);
    let outlet: JSX.Element;
    if (this.state.login && this.state.user.email.length === 0) {
      outlet = (
        <Login
          email_input={this.state.email_input}
          password_input_one={this.state.password_input_one}
          handleInputChange={e => this.handleInputChange(e)}
          login={e => this.login(e)}
          toggleLogin={() => this.toggleLogin()}
        />
      );
    } else if (!this.state.login && this.state.user.email.length === 0) {
      outlet = (
        <Register
          email_input={this.state.email_input}
          password_input_one={this.state.password_input_one}
          password_input_two={this.state.password_input_two}
          handleInputChange={e => this.handleInputChange(e)}
          handleRegister={e => this.handleRegister(e)}
        />
      );
    } else {
      outlet = <span />;
    }

    return (
      <Router history={history}>
        <div className="App">
          <Header />
          <div className="row view">
            <div className="col-12">{outlet}</div>
            <Switch>
              <PrivateRoute
                exact
                path="/dashboard"
                auth={this.state.auth}
                component={DashBoard}
              />
              <PrivateRoute path="/:user" component={User} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}
