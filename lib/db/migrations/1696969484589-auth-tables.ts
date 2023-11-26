import { Kysely, sql } from 'kysely';
import { withTimestamps } from '../utils/migration-helpers';

export async function up(db: Kysely<any>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await withTimestamps(
      trx.schema
        .createTable('User')
        .addColumn('id', 'char(36)', (col) => col.primaryKey().defaultTo(sql`(uuid())`))
        .addColumn('name', 'text')
        .addColumn('email', 'varchar(254)', (col) => col.unique().notNull())
        .addColumn('emailVerified', 'timestamp')
        .addColumn('image', 'text')
    ).execute();

    await withTimestamps(
      trx.schema
        .createTable('Account')
        .addColumn('id', 'char(36)', (col) => col.primaryKey().defaultTo(sql`(uuid())`))
        .addColumn('userId', 'char(36)', (col) => col.references('User.id').notNull())
        .addColumn('type', 'text', (col) => col.notNull())
        .addColumn('provider', 'text', (col) => col.notNull())
        .addColumn('providerAccountId', 'text', (col) => col.notNull())
        .addColumn('refresh_token', 'text')
        .addColumn('access_token', 'text')
        .addColumn('expires_at', 'bigint')
        .addColumn('token_type', 'text')
        .addColumn('scope', 'text')
        .addColumn('id_token', 'text')
        .addColumn('session_state', 'text')
    ).execute();

    await withTimestamps(
      trx.schema
        .createTable('Session')
        .addColumn('id', 'char(36)', (col) => col.primaryKey().defaultTo(sql`(uuid())`))
        .addColumn('userId', 'char(36)', (col) => col.references('User.id').onDelete('cascade').notNull())
        .addColumn('sessionToken', 'char(36)', (col) => col.notNull().unique())
        .addColumn('expires', 'timestamp', (col) => col.notNull())
    ).execute();

    await trx.schema
      .createTable('VerificationToken')
      .addColumn('identifier', 'varchar(255)', (col) => col.notNull())
      .addColumn('token', 'varchar(255)', (col) => col.notNull().unique())
      .addColumn('expires', 'timestamp', (col) => col.notNull())
      .execute();

    await trx.schema.createIndex('Account_userId_index').on('Account').column('userId').execute();

    await trx.schema.createIndex('Session_userId_index').on('Session').column('userId').execute();
  });
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await trx.schema.dropTable('Account').ifExists().execute();
    await trx.schema.dropTable('Session').ifExists().execute();
    await trx.schema.dropTable('User').ifExists().execute();
    await trx.schema.dropTable('VerificationToken').ifExists().execute();
  });
}
