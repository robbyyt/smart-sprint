import 'server-only';
import { Transaction } from '@/lib/db';
import { BaseTransactionalRepo } from '@/lib/db/utils/base-transactional-repo';
import { NewCycleTemplate } from '@/lib/db/entities/cycle';

export class TransactionalCycleTemplateRepo extends BaseTransactionalRepo {
  constructor(trx: Transaction) {
    super(trx);
  }

  async create(newCycleTemplate: NewCycleTemplate) {
    return this.queryRunner.insertInto('cycleTemplate').values(newCycleTemplate).executeTakeFirst();
  }
}
