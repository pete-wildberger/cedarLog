import * as React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import history from './history';
import { DashBoard, Login, PrivateRoute, Register, User } from './components/';
// https://tylermcginnis.com/react-router-protected-routes-authentication/

const FourOhFour = () => <h1>Oh no 404</h1>;
interface AppProps {}

interface AppState {
	user?: { [key: string]: any };
	login?: boolean;
	email_input?: string;
	password_input_one?: string;
	password_input_two?: string;
}

export class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			user: {
				email: ''
			},
			email_input: '',
			login: true,
			password_input_one: '',
			password_input_two: ''
		};
	}
	clearLoginState = (): void => {
		this.setState({
			email_input: '',
			password_input_one: '',
			password_input_two: ''
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
			axios
				.post('/register', creds)
				.then(res => {
					console.log(res);
					this.setState({ user: res.data });
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
		axios
			.post('/login', creds)
			.then(res => {
				console.log(res);
				this.setState({ user: res.data });
				console.log(this.state);
				history.push('/dashboard');
			})
			.catch(err => {
				console.log(err);
			});
		this.clearLoginState();
	};
	toggleLogin = () => {
		this.setState({
			login: !this.state.login
		});
	};
	render() {
		console.log('email', this.state.user.email.length);
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
			<BrowserRouter>
				<div className="row">
					<div className="col-12">{outlet}</div>
					<Switch>
						<PrivateRoute exact path="/dashboard" component={DashBoard} />
						<PrivateRoute path="/:user" component={User} />
					</Switch>
					<Route component={FourOhFour} />
				</div>
			</BrowserRouter>
		);
	}
}
