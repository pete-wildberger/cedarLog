import { Request, Response, NextFunction } from 'express';
import { UsersModel, UsersModel_type } from '../models';
import * as bcrypt from 'bcrypt';
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
	constructor() {
		this.um = UsersModel;
	}
	comparePassword(user: { [key: string]: any }, passwordToCompare: string) {
		return new Promise(resolve => {
			bcrypt.compare(passwordToCompare, user.password, (err: any, match: boolean) => {
				if (err) {
					console.log('Error comparing password', err);
					return resolve(false);
				}
				resolve(match);
			});
		});
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
		bcrypt.hash(req.body.password, process.env.SALT, (err, hash) => {
			if (err) {
				console.log('Error hashing password', err);
				res.status(400).send('unable to hash.');
			}
			const newUser = {
				email: req.body.email,
				password: hash
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
		});
	};
}
export const Users = new UsersHandler();
