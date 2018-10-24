import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import { UsersModel } from '../models';
import { Users } from '../handlers';
const LocalStrategy = passportLocal.Strategy;

export const PassportInit = (): void => {
	passport.use(
		'local',
		new LocalStrategy(
			{
				passReqToCallback: true,
				usernameField: 'email',
				passwordField: 'password'
			},
			(req, email, attemptedPassword, done) => {
				// find user document
				UsersModel.find_by_email(email).then((user: any) => {
					console.log('user', user);
					if (!user) {
						done(null, false, { message: 'Incorrect credentials.' });
					} else {
						Users.comparePassword(user, attemptedPassword).then((isMatch: boolean) => {
							if (isMatch) {
								done(null, user, { message: 'Successful Login' });
							} else {
								done(null, false, { message: 'Incorrect credentials.' });
							}
						});
					}
				});
			}
		)
	);

	passport.serializeUser((user: any, done: Function) => {
		console.log('serial', user);
		done(null, user._id);
	});

	passport.deserializeUser((_id: number, done: Function) => {
		console.log('deserial', _id);
		UsersModel.find_by_id(_id).then(foundUser => {
			console.log('foundUser', foundUser);
			done(null, foundUser);
		});
	});
};
