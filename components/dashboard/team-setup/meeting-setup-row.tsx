import { SetupCycleInput } from '@/lib/schema/cycle-template';
import { Field, FieldArrayWithId } from 'react-hook-form';

export default function MeetingSetupRow({
  field,
  index,
}: {
  field: FieldArrayWithId<SetupCycleInput, 'meetings'>;
  index: number;
}) {
  console.log(field);
  return <></>;
}
