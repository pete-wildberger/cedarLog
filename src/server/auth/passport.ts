var passport = require('passport');
import * as passportLocal from 'passport-local';
import { UsersModel } from '../models';

const LocalStrategy = passportLocal.Strategy;

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
				if (!user) {
					done(null, false, { message: 'Incorrect credentials.' });
				} else {
					user.comparePassword(attemptedPassword, (isMatch: boolean) => {
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
	done(null, user._id);
});

passport.deserializeUser((id: number, done: Function) => {
	UsersModel.find_by_id(id).then(foundUser => {
		done(null, foundUser);
	});
});

export default passport;
