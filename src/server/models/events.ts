import * as pg from 'pg';
import { Model, model_type } from './lib/model.class';
import { pool } from './connection';

export interface EventsModel_type extends Model<model_type> {
	find_by_email(email: string): any;
}

class Events extends Model<model_type> {
	constructor(pool: pg.Pool, table: string) {
		super(pool, table);
		this.table = table;
	}
	upsert(entries: Array<{ [key: string]: string }>): Promise<any> {
		const props: string[] = Object.keys(entries[0]);
		let count: number = 1;
		let values: any[] = [];
		let updates: string[] = [];
		let inserts: string[] = [];
		props.forEach(prop => {
			updates.push(`${prop} = excluded.${prop}`);
		});
		entries.forEach(entry => {
			let blings: string[] = [];
			for (let prop in entry) {
				values.push(entry[prop]);
				blings.push('$' + count);
				count++;
			}
			inserts.push(`(${blings.join(',')})`);
		});
		const query: string = `INSERT INTO ${this.table} (${props.join(',')})
                            VALUES ${inserts.join(',')}
                            ON CONFLICT (title)
                            DO
                              UPDATE
                                SET ${updates.join(',')}
                            RETURNING *`;
		return this.request(query, values);
	}
}
export const EventsModel = new Events(pool, 'events');
