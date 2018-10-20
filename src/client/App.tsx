import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Display from './components/Display';
import { PrivateRoute, User } from './components/';
// https://tylermcginnis.com/react-router-protected-routes-authentication/

const FourOhFour = () => <h1>Oh no 404</h1>;

class App extends React.Component {
  public state;
  constructor(props: any) {
    super(props);
    this.state = {
      user: {},
      email_input: '',
      password_input: ''
    };
  }
  getUser = () => {
    let user;
    this.setState({ user });
  };
  login = e => {
    e.preventDefault();
    const creds = {
      email: this.state.email_input,
      password: this.state.password_input
    };
    axios
      .post('/login', creds)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Display} />
            <Route path="/:user" component={User} />
            <Route component={FourOhFour} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
