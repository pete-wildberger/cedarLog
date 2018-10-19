import * as pg from 'pg';
import { Model, model_type } from './lib/model.class';
import { pool } from './connection';

export interface TicketsModel_type extends Model<model_type> {
	newObj(): any;
	remove(id: number): any;
	newObjs(): any;
}

class Tickets extends Model<model_type> {
	constructor(pool: pg.Pool, table: string) {
		super(pool, table);
		this.table = table;
	}
	newObj(): any {
		// let query = 'INSERT INTO tickets(row, seat) VALUES($1, $2) RETURNING *';
		let params = { seat: 5, aisle: 5 };
		return this.single_insert(params);
	}
	newObjs(): any {
		console.log('newObjs()');
		let params = [{ seat: 6, aisle: 5 }, { seat: 7, aisle: 5 }, { seat: 8, aisle: 5 }];
		return this.bulk_insert(params);
	}
	remove(id: number): any {
		return this.destroy_by_id(id);
	}
}
export const TicketsModel = new Tickets(pool, 'tickets');
