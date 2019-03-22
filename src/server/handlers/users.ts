import { Request, Response, NextFunction } from 'express';
import { UsersModel } from '../models';
import * as bcrypt from 'bcrypt';

export class Users {
	static comparePassword(user: { [key: string]: any }, passwordToCompare: string) {
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
	static isLoggedIn(req: Request, res: Response, next: NextFunction) {
		if (req.isAuthenticated()) {
			console.log('authed');
			next();
		} else {
			console.log('nope');
			res.redirect('/');
		}
	}
	static login(req: Request, res: Response) {
		res.status(200).send({
			email: req.user.email,
			_id: req.user._id,
			auth: req.isAuthenticated()
		});
	}
	static register = (req: Request, res: Response) => {
		bcrypt.hash(req.body.password, +process.env.SALT, (err, hash) => {
			if (err) {
				console.log('Error hashing password', err);
				res.status(400).send('unable to hash.');
			}
			let newUser = {
				email: req.body.email,
				password: hash
			};
			UsersModel.single_insert(newUser).then(data => {
				if (data) {
					console.log('login', req);
					req.login(data, err => {
						if (err) {
							console.log('err', err);
							res.status(400).send('unable to authenticate.');
						} else {
							data.auth = req.isAuthenticated();
							res.status(201).send(data);
						}
					});
				} else {
					res.status(400).send(data);
				}
			});
		});
	};
}
