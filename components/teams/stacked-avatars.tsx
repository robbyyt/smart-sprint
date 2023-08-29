'use client';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

interface StackedAvatarsProps {
  teamId: number | string;
  imageUrls: string[];
  total: number;
}
const StackedAvatars = ({ teamId, imageUrls, total }: StackedAvatarsProps) => {
  if (!imageUrls.length || total === 0) {
    return null;
  }

  const extraPictures = total ? Math.max(total - imageUrls.length, 0) : 0;
  return (
    <div className='flex -space-x-4'>
      {imageUrls.map((src, index) => (
        <Link className='cursor-pointer' key={`avatar-${index}-${src}`} href={`/teams/${teamId}`} passHref>
          <Avatar className='border-2'>
            <AvatarImage src={src} />
          </Avatar>
        </Link>
      ))}
      {extraPictures > 0 && (
        <Link href={`/teams/${teamId}`} passHref className='cursor-pointer'>
          <Avatar className='border-2'>
            <AvatarFallback>{`${extraPictures}+`}</AvatarFallback>
          </Avatar>
        </Link>
      )}
    </div>
  );
};

export default StackedAvatars;
