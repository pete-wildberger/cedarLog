import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { Users, Events } from './handlers/';
import api_routes from './api_routes';

class App {
	public express: express.Application;
	constructor() {
		this.express = express();
		this.middleware();
		this.routes();
	}
	private middleware(): void {
		this.express.use(cookieParser());
		this.express.use(compression());
		this.express.use(helmet());
		this.express.use(express.static('dist'));
		this.express.use(bodyParser.urlencoded({ extended: true }));
		this.express.use(bodyParser.json());
		this.express.use(
			session({
				secret: process.env.SESSION_SECRET || 'cedarLog',
				name: 'user',
				resave: false,
				saveUninitialized: false,
				cookie: { maxAge: 43200000, secure: false }
			})
		);
		this.express.use(passport.initialize());
		this.express.use(passport.session());
	}
	private routes() {
		this.express.route('/register').post(Users.register);
		this.express.route('/login').post(passport.authenticate('local'), Users.login);
		this.express.route('/logout').get((req, res) => {
			req.session.destroy(() => {
				req.logout();
				res.clearCookie('user');
				res.redirect('/');
			});
		});

		this.express.use('/api', Users.isLoggedIn, api_routes);
		this.express.get('/events', Events.events);
		this.express.get('*', (req: express.Request, res: express.Response) => {
			res.sendFile(path.join(__dirname, 'index.html'));
		});
	}
}

export default new App().express;
