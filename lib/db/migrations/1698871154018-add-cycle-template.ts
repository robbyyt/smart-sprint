import { Kysely, sql } from 'kysely';
import { withTimestamps } from '../helpers';

export async function up(db: Kysely<any>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await withTimestamps(
      trx.schema
        .createTable('cycle_template')
        .addColumn('id', 'char(36)', (col) => col.primaryKey().defaultTo(sql`(uuid())`))
        .addColumn('start_week_day', sql`tinyint`, (col) => col.notNull())
        .addColumn('duration_in_work_days', sql`tinyint`, (col) => col.notNull())
        .addColumn('timezone', 'varchar(36)', (col) => col.notNull())
        .addColumn('team_id', 'integer')
    ).execute();
  });
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await trx.schema.dropTable('cycle_template');
  });
}
