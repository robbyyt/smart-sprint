import 'server-only';
import { Transaction } from '@/lib/db';
import { BaseTransactionalRepo } from '@/lib/db/utils/base-transactional-repo';
import { NewMeetingTemplate } from '@/lib/db/entities/meeting';

export class TransactionalMeetingTemplateRepo extends BaseTransactionalRepo {
  constructor(trx: Transaction) {
    super(trx);
  }

  async createMultiple(newMeetingTemplates: NewMeetingTemplate[]) {
    return this.queryRunner.insertInto('meetingTemplate').values(newMeetingTemplates).execute();
  }
}
