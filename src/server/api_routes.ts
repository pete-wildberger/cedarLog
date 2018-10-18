import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { Tickets } from './handlers/';

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
    const tickets = express.Router();
    // tickets.get('/:id', handlers.tickets.get_by_id);
    tickets.get('/', Tickets.all);
    tickets.post('/', Tickets.create);
    tickets.post('/more', Tickets.create_many);
    this.api.use('/tickets', tickets);
  }
}
export default new Router().api;
