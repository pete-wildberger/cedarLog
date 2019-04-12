import * as React from 'react';
export function CheckBox(props) {
	if (props.filled) {
		return <span className="checkbox checked" />;
	} else {
		return <span className="checkbox" />;
	}
}
