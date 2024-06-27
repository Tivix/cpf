import Image from 'next/image';
import { AvatarProps, AvatarVariant } from './Avatar.interface';
import { generateClassNames } from '@app/utils';

const variants: {
  [key in AvatarVariant]: string;
} = {
  '28': 'w-7 h-7 text-sm text-xs',
  '40': 'w-10 h-10 text-xs',
  '56': 'w-14 h-16 text-sm',
  '72': 'w-[72px] h-[72px] text-base',
  '100': 'w-[100px] h-[100px]',
  '320': 'w-80 h-80',
};

export const Avatar: React.FC<AvatarProps> = ({ firstName, lastName, imageUrl, variant = '40' }) => {
  const avatarClass = generateClassNames(
    'rounded-full bg-blue-700 flex justify-center items-center',
    variants[variant],
  );

  return (
    <div className={avatarClass}>
      {imageUrl ? (
        <Image className="inline-block w-full h-full rounded-full" src={imageUrl} alt="User avatar" />
      ) : (
        <span className="text-white">
          {firstName[0]}
          {lastName[0]}
        </span>
      )}
    </div>
  );
};
