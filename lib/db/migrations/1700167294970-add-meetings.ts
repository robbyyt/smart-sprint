import { Kysely, sql } from 'kysely';
import { withTimestamps, toEnumType } from '../helpers';
import { MEETING_RECURRENCE_VALUES } from '@/lib/types/meeting';

export async function up(db: Kysely<any>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await withTimestamps(
      trx.schema
        .createTable('meeting_template')
        .addColumn('id', 'char(36)', (col) => col.primaryKey().defaultTo(sql`(uuid())`))
        .addColumn('original_start_date', 'date', (col) => col.notNull())
        .addColumn('recurrence', toEnumType(MEETING_RECURRENCE_VALUES))
        .addColumn('start_time', 'time', (col) => col.notNull())
        .addColumn('end_time', 'time', (col) => col.notNull())
        .addColumn('timezone', 'varchar(36)', (col) => col.notNull())
        .addColumn('cycle_template_id', 'char(36)', (col) => col.references('cycle_template.id').notNull())
    ).execute();

    await withTimestamps(
      trx.schema
        .createTable('meeting')
        .addColumn('id', 'char(36)', (col) => col.primaryKey().defaultTo(sql`(uuid())`))
        .addColumn('start_date', 'date', (col) => col.notNull())
        .addColumn('start_time', 'time', (col) => col.notNull())
        .addColumn('end_time', 'time', (col) => col.notNull())
        .addColumn('timezone', 'varchar(36)', (col) => col.notNull())
        .addColumn('cycle_id', 'char(36)', (col) => col.references('cycle.id'))
        .addColumn('meeting_template_id', 'char(36)', (col) => col.references('meeting_template.id'))
    ).execute();
  });
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.transaction().execute(async (trx) => {});
}
