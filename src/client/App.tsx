import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DashBoard, Login, PrivateRoute, Register, User } from './components/';
// https://tylermcginnis.com/react-router-protected-routes-authentication/

const FourOhFour = () => <h1>Oh no 404</h1>;

interface AppState {
	user: { [key: string]: any };
	email_input: string;
	password_input_one: string;
	password_input_two: string;
}

class App extends React.Component<AppState> {
	public state: AppState;
	constructor(props: any) {
		super(props);
		this.state = {
			user: {},
			email_input: '',
			password_input_one: '',
			password_input_two: ''
		};
	}
	getUser = () => {
		let user;
		this.setState({ user });
	};
	handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	login = e => {
		e.preventDefault();
		const creds = {
			email: this.state.email_input,
			password: this.state.password_input_one
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
		let outlet: JSX.Element = (
			<Register
				email_input={this.state.email_input}
				password_input_one={this.state.password_input_one}
				password_input_two={this.state.password_input_two}
				handleInputChange={e => this.handleInputChange(e)}
			/>
		);
		return (
			<BrowserRouter>
				<div>
					<Switch>
						{outlet}
						<Route exact path="/" component={DashBoard} />
						<Route path="/:user" component={User} />
						<Route component={FourOhFour} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}
export default App;
