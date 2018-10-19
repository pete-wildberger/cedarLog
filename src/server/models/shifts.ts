import * as pg from 'pg';
import { Model, model_type } from './lib/model.class';
import { pool } from './connection';

export interface ShiftsModel_type extends Model<model_type> {}

class Shifts extends Model<model_type> {
	constructor(pool: pg.Pool, table: string) {
		super(pool, table);
		this.table = table;
	}
}
export const ShiftsModel = new Shifts(pool, 'shifts');
