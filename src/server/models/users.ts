import * as pg from 'pg';
import { Model, model_type } from './model.class';
import { pool } from './connection';

export interface UsersModel_type extends Model<model_type> {
	find_by_email(email: string): any;
}

class Users extends Model<model_type> {
	constructor(pool: pg.Pool, table: string) {
		super(pool, table);
		this.table = table;
	}
	find_by_email(email: string) {
		const query: string = `SELECT * FROM users WHERE email = $1`;
		return this.request(query, [email]);
	}
}
export const UsersModel = new Users(pool, 'users');
