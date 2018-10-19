import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Events, Tickets, Users } from './handlers/';

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
		this.api.route('/scrape').get(Events.events);
	}
}
export default new Router().api;
