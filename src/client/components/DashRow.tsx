import * as React from 'react';

interface DashRowProps {
	auth: boolean;
	logout: React.MouseEventHandler<HTMLButtonElement>;
}
export const DashRow = (props: { [key: string]: any }): JSX.Element => {
	console.log('DashRow', props);

	const vals = Object.values(props);
	return (
		<div className="flex-table-d">
			{vals.map((prop: any) => {
				return <span>{prop} </span>;
			})}
		</div>
	);
};
export const DashHead = (props: { [key: string]: any }): JSX.Element => {
	console.log('DashHead', props);
	const vals = Object.keys(props);
	return (
		<div className="flex-table-d">
			{vals.map((prop: any) => {
				return <span>{prop} </span>;
			})}
		</div>
	);
};
