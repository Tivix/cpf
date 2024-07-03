import Image from 'next/image';
import { AvatarProps, AvatarVariant } from './Avatar.interface';
import { generateClassNames } from '@app/utils';

const variants: {
  [key in AvatarVariant]: string;
} = {
  '28': 'w-7 h-7 text-sm text-xs',
  '40': 'w-10 h-10 text-base',
  '56': 'w-14 h-14 text-xl',
  '72': 'w-[72px] h-[72px] text-2xl',
  '100': 'w-[100px] h-[100px] text-4xl',
  '320': 'w-80 h-80 text-5xl',
};

export const Avatar: React.FC<AvatarProps> = ({ firstName, lastName, imageUrl, variant = '40' }) => {
  const avatarClass = generateClassNames(
    'rounded-full bg-blue-700 flex justify-center items-center',
    variants[variant],
  );

  return (
    <div className={avatarClass}>
      {imageUrl ? (
        <Image className="inline-block h-full w-full rounded-full" src={imageUrl} alt="User avatar" />
      ) : (
        <span className="text-white">
          {firstName[0]}
          {lastName[0]}
        </span>
      )}
    </div>
  );
};
