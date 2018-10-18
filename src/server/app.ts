import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import api_routes from './api_routes';

class App {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }
  private middleware(): void {
    this.express.use(express.static('dist'));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
  }
  private routes() {
    this.express.use('/api', api_routes);
    this.express.get('/', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname, 'index.html'));
    });
  }
}

export default new App().express;
