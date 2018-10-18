import { Request, Response, NextFunction } from 'express';
import { UsersModel, UsersModel_type } from '../models';

// export interface TicketsHandler_type {
// 	tm: TicketsModel_type;
// 	QRCode: any;
// 	md5: any;
// 	all(req: Request, res: Response): any;
// 	create(req: Request, res: Response): any;
// 	create_many(req: Request, res: Response): any;
// }

class UsersHandler {
	public um: UsersModel_type;
	// public QRCode = QRCode;
	// public md5 = Md5;
	constructor() {
		this.um = UsersModel;
	}
	isLoggedIn(req: Request, res: Response, next: NextFunction) {
		if (req.isAuthenticated()) {
			next();
		} else {
			console.log('nope');
			res.redirect('/');
		}
	}
	login(req: Request, res: Response) {
		res.status(200).send({
			email: req.user.email,
			id: req.user._id
		});
	}
	register = (req: Request, res: Response) => {
		let newUser = {
			email: req.body.email,
			password: req.body.password
		};
		this.um.single_insert(newUser).then(err => {
			if (err) {
				res.status(400).send(err);
			} else {
				req.login(newUser, err => {
					if (err) {
						console.log(err);
						res.status(400).send('unable to authenticate.');
					} else {
						res.status(201).send(newUser);
					}
				});
			}
		});
	};
}
export const Users = new UsersHandler();
