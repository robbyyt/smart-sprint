import 'server-only';
import { Transaction } from '@/lib/db';
import { BaseTransactionalRepo } from '@/lib/db/utils/base-transactional-repo';
import { NewMeeting } from '@/lib/db/entities/meeting';

export class TransactionalMeetingRepo extends BaseTransactionalRepo {
  constructor(trx: Transaction) {
    super(trx);
  }

  async createMultiple(newMeetings: NewMeeting[]) {
    return this.queryRunner.insertInto('meeting').values(newMeetings).returningAll().execute();
  }
}
