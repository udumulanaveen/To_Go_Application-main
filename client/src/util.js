import axios from 'axios';
import * as _ from 'lodash';

const modalStyle = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		width: '500px',
		border: 'none',
		transform: 'translate(-50%, -50%)',
		boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
	},
};

const modalStyle2 = {
	content: {
		...modalStyle.content,
		top: '55%',
		width: '850px',
	},
};

export function safelyRun(cb, ...args) {
	if (cb && _.isFunction(cb)) {
		try {
			return cb(...args);
		} catch (e) {
			console.trace(e);
		}
	}
}

export async function fetch(method = 'GET', url, parameters) {
	const response = await axios.request({
		method,
		url,
		data: parameters,
	});

	return response;
}
const request = async (path, options = {}) => {
	safelyRun(options.before);
	const response = await fetch(options.method || 'GET', 'https://togoapp.herokuapp.com/api/' + path, options.parameters);

	const { data } = response;

	if (data.success) safelyRun(options?.success, data, response);
	if (!data.success) safelyRun(options?.failure, data, response);

	safelyRun(options?.after);
};

function setItemHelper(state, setState) {
	const setItem = (key) => (value) => {
		setState({
			...state,
			[key]: value,
		});
	};

	return setItem;
}
export { modalStyle, request, setItemHelper, modalStyle2 };
