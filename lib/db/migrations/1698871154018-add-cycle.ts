import { Kysely } from 'kysely';
import { withTimestamps } from '../utils/migration-helpers';

export async function up(db: Kysely<any>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await withTimestamps(
      trx.schema
        .createTable('cycle_template')
        .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
        .addColumn('start_date', 'date', (col) => col.notNull())
        .addColumn('end_date', 'date', (col) => col.notNull())
        .addColumn('timezone', 'varchar(36)', (col) => col.notNull())
        .addColumn('team_id', 'integer', (col) => col.references('team.id').notNull())
        .addColumn('created_by', 'char(36)', (col) => col.references('User.id').notNull())
    ).execute();

    await withTimestamps(
      trx.schema
        .createTable('cycle')
        .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
        .addColumn('start_date', 'date', (col) => col.notNull())
        .addColumn('end_date', 'date', (col) => col.notNull())
        .addColumn('timezone', 'varchar(36)', (col) => col.notNull())
        .addColumn('team_id', 'integer', (col) => col.references('team.id').notNull())
        .addColumn('created_by', 'char(36)', (col) => col.references('User.id').notNull())
        .addColumn('cycle_template_id', 'integer', (col) => col.references('cycle_template.id').notNull())
    ).execute();
  });
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await trx.schema.dropTable('cycle');
    await trx.schema.dropTable('cycle_template');
  });
}
