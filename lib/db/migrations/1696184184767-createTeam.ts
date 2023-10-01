import { Kysely } from 'kysely';
import { withTimestamps } from '../helpers';

export async function up(db: Kysely<any>): Promise<void> {
  await withTimestamps(
    db.schema
      .createTable('team')
      .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
      .addColumn('name', 'varchar(50)', (col) => col.notNull())
  ).execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('team').execute();
}
