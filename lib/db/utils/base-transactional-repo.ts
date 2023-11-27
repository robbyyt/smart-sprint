import { Transaction } from '@/lib/db';

export class BaseTransactionalRepo {
  protected readonly queryRunner: Transaction;

  constructor(trx: Transaction) {
    this.queryRunner = trx;
  }
}
