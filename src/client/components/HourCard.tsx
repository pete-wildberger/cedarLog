import * as React from 'react';
import { CheckBox } from './CheckBox';
export class HourCard extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		return (
			<div>
				<div className="check-container-top">
					{this.props.boxes.map(box => {
						return <CheckBox />;
					})}
				</div>
				<span>{this.props.name}</span>
				<div className="check-container-bottom" />
			</div>
		);
	}
}
