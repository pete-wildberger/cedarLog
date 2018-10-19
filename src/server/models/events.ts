import * as pg from 'pg';
import { Model, model_type } from './model.class';
import { pool } from './connection';

export interface EventsModel_type extends Model<model_type> {
  find_by_email(email: string): any;
}

class Events extends Model<model_type> {
  constructor(pool: pg.Pool, table: string) {
    super(pool, table);
    this.table = table;
  }
  upsert() {
    const params: any = [];
    const query: string = ` MERGE INTO contact_info T USING (SELECT '${body.employee_code}' AS  employee_code) AS S ON(T.employee_code = S.employee_code  )
            WHEN MATCHED THEN
              UPDATE SET
                last_modified_at = GETUTCDATE(), last_modified_by = '#{body._employee_code}', #{updates.join(',')}
            WHEN NOT MATCHED THEN
              INSERT ( last_modified_at, last_modified_by, #{keys.join(',')})
              VALUES ( GETUTCDATE(), '${body._employee_code}', #{values.join(',')})
            OUTPUT INSERTED.*; `;
    return this.request(query, [params]);
  }
}
export const EventsModel = new Events(pool, 'events');
