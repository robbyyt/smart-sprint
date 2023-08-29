import { TeamData } from '@/lib/types/team';
import StackedAvatars from '@/components/teams/stacked-avatars';

const TeamListItem = ({ totalMembers, membersToShowcase, id, name }: TeamData) => {
  return (
    <div className='my-2 flex items-center justify-between border-b border-solid p-2 lg:w-[60%]'>
      <h2 className='text-2xl font-medium'>{name}</h2>
      <StackedAvatars teamId={id} imageUrls={membersToShowcase.map((member) => member.imageUrl)} total={totalMembers} />
    </div>
  );
};

export default TeamListItem;
