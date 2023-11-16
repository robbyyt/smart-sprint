import { Kysely, sql } from 'kysely';
import { withTimestamps } from '../helpers';

export async function up(db: Kysely<any>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    const query = withTimestamps(
      trx.schema
        .createTable('meeting_template')
        .addColumn('id', 'char(36)', (col) => col.primaryKey().defaultTo(sql`(uuid())`))
        .addColumn('offset_from_cycle_start_in_days', sql`SMALLINT UNSIGNED`, (col) => col.notNull())
        .addColumn('start_time', 'time', (col) => col.notNull())
        .addColumn('end_time', 'time', (col) => col.notNull())
        .addColumn('timezone', 'varchar(36)', (col) => col.notNull())
        .addColumn('cycle_template_id', 'char(36)', (col) => col.references('cycle_template.id').notNull())
    );

    console.log(query.compile().sql);
    await query.execute();

    await withTimestamps(
      trx.schema
        .createTable('meeting')
        .addColumn('id', 'char(36)', (col) => col.primaryKey().defaultTo(sql`(uuid())`))
        .addColumn('startDate', 'date', (col) => col.notNull())
        .addColumn('start_time', 'time', (col) => col.notNull())
        .addColumn('end_time', 'time', (col) => col.notNull())
        .addColumn('timezone', 'varchar(36)', (col) => col.notNull())
        .addColumn('meeting_template_id', 'char(36)', (col) => col.references('meeting_template.id'))
    ).execute();
  });
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.transaction().execute(async (trx) => {});
}
