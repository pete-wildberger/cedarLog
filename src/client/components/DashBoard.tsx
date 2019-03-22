import * as React from 'react';
// import axios from "axios";
import { dug } from '../dug';
import { DashHead, DashRow } from './DashRow';
import { Link, withRouter } from 'react-router-dom';

interface IChildComponentProps extends React.Props<any> {
	auth: boolean;
	user: { [key: string]: any };
}

// interface PassedProps extends React.Props<any> {
//   propToPass: any;
// }
interface state_type {
	events: any[];
}
const defaultDashState: state_type = {
	events: []
};
export class DashBoard extends React.Component<IChildComponentProps, state_type> {
	state: state_type;
	constructor(props: any) {
		super(props);
		this.state = defaultDashState;
	}

	componentDidMount() {
		console.log('HELOOOO', this.props, this.state);
		dug
			.get('/api/events')
			.then(events => {
				console.log('res', events);
				this.setState({ events });
				console.log(this.state);
			})
			.catch(err => {
				console.log(err);
			});
		// dug
		// 	.get('/api/scrape')
		// 	.then(res => {
		// 		console.log(res);
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});
	}
	render() {
		if (this.state.events.length > 0) {
			return (
				<div className="row dash">
					<div className="col-3 menuTab">
						<a href="">Shows</a>
					</div>
					<div className="col-9 menuTab">
						<input type="text" />
						<div className="flex-table-row">
							<DashHead {...this.state.events[0]} />
							{this.state.events.map(event => {
								return <DashRow key={event.id} {...event} />;
							})}
						</div>
					</div>
				</div>
			);
		} else {
			return <img className="center-img" src="https://media.giphy.com/media/26BRA7WJEcn7yJy3C/giphy.gif" alt="Loading" />;
		}
	}
}
