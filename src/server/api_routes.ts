import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { Tickets, Users } from './handlers/';

class Router {
	public api: express.Router;
	constructor() {
		this.api = express.Router();
		this.middleware();
		this.routes();
	}
	private middleware() {
		this.api.use(bodyParser.json());
	}
	private routes() {
		this.api.route('/tickets').get(Tickets.all);
	}
}
export default new Router().api;
