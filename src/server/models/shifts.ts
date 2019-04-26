import * as pg from 'pg';
import { Model } from 'dbaser';
import { pool } from './connection';

export interface ShiftsModel_type extends Model {}

class Shifts extends Model {
	constructor(pool: pg.Pool, table: string) {
		super(pool, table);
		this.table = table;
	}
}
export const ShiftsModel = new Shifts(pool, 'shifts');
