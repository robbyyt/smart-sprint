const fs = require('fs');
const path = require('path');

function getCurrentTimestamp(): number {
  return new Date().getTime();
}

function generateMigrationFileName(name: string): string {
  const timestamp = getCurrentTimestamp();
  return `${timestamp}-${name}.ts`;
}

function generateMigrationContent(name: string): string {
  // You can customize the migration code here
  return `import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code for "${name}"
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code for "${name}"
}
`;
}

function createMigrationFile(name: string): void {
  const migrationFileName = generateMigrationFileName(name);
  const migrationFilePath = path.join(__dirname, '..', 'lib', 'db', 'migrations', migrationFileName);
  const migrationContent = generateMigrationContent(name);

  fs.writeFileSync(migrationFilePath, migrationContent);

  console.log(`Migration file created: ${migrationFileName}`);
}

const args: string[] = process.argv.slice(2);
const nameArg: string | undefined = args.find((arg) => arg.startsWith('--name='));
const migrationName: string = nameArg ? nameArg.split('=')[1] : 'unnamedMigration';

createMigrationFile(migrationName);
