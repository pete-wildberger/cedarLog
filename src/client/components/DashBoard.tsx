import * as React from 'react';
// import axios from "axios";
import { dug } from '../dug';
import { Link, withRouter } from 'react-router-dom';

interface IChildComponentProps extends React.Props<any> {
	auth: boolean;
	user: { [key: string]: any };
}

// interface PassedProps extends React.Props<any> {
//   propToPass: any;
// }
interface state_type {
	// auth: boolean;
	hi: string;
}
export class DashBoard extends React.Component<IChildComponentProps, any> {
	state: state_type;
	constructor(props: any) {
		super(props);
		this.state = {
			hi: 'hi'
			// auth: props
		};
	}

	componentDidMount() {
		console.log('HELOOOO', this.props, this.state);
		dug
			.get('/api/scrap')
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	}
	render() {
		return (
			<div>
				<img className="center-img" src="https://media.giphy.com/media/26BRA7WJEcn7yJy3C/giphy.gif" alt="Loading" />
			</div>
		);
	}
}
