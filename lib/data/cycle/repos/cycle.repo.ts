import 'server-only';
import { Transaction } from '@/lib/db';
import { BaseTransactionalRepo } from '@/lib/db/utils/base-transactional-repo';
import { NewCycle } from '@/lib/db/entities/cycle';

export class TransactionalCycleRepo extends BaseTransactionalRepo {
  constructor(trx: Transaction) {
    super(trx);
  }

  async create(newCycle: NewCycle) {
    return this.queryRunner.insertInto('cycle').values(newCycle).executeTakeFirst();
  }
}
