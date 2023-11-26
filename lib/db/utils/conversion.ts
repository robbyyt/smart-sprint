import { SqlBool } from 'kysely';

export function castToBool(value: SqlBool | '0' | '1'): boolean {
  if (typeof value === 'string') {
    return value === '1';
  }

  return Boolean(value);
}
