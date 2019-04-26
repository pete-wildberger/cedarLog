import * as pg from 'pg';
import { Model } from 'dbaser';
import { pool } from './connection';

export interface UsersModel_type extends Model {
	find_by_email(email: string): any;
}

class Users extends Model {
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
