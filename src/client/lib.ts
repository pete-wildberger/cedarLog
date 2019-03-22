export class Dug {
	private config: RequestInit;
	private errorHandler: (response: Response) => Response | PromiseLike<Response>;
	constructor(config: RequestInit, handleError: (response: Response) => Response | PromiseLike<Response>) {
		this.config = config;
		this.errorHandler = handleError;
	}
	get = (url: string): Promise<any> => {
		let options: RequestInit = { ...this.config };
		options.method = 'GET';
		return fetch(url, options) // body data type must match "Content-Type" header
			.then(this.errorHandler)
			.then(response => response.json()); // parses response to JSON
	};
	post = (url: string, data: { [key: string]: any }): Promise<any> => {
		let options: RequestInit = { ...this.config };
		options.method = 'POST';
		options.body = JSON.stringify(data);
		return fetch(url, options) // body data type must match "Content-Type" header
			.then(this.errorHandler)
			.then(response => response.json()); // parses response to JSON
		// .then(body => JSON.parse(body))
	};
	put = (url: string, data: { [key: string]: any }): Promise<any> => {
		let options: RequestInit = { ...this.config };
		options.method = 'PUT';
		options.body = JSON.stringify(data);
		return fetch(url, options) // body data type must match "Content-Type" header
			.then(this.errorHandler)
			.then(response => response.json()); // parses response to JSON
		// .then(body => JSON.parse(body))
	};

	delete = (url: string): Promise<any> => {
		let options: RequestInit = { ...this.config };
		options.method = 'DELETE';
		return fetch(url, options) // body data type must match "Content-Type" header
			.then(this.errorHandler)
			.then(response => response.json()); // parses response to JSON
		// .then(body => JSON.parse(body))
	};
}
