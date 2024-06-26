import { AvatarProps, AvatarSize } from './Avatar.interface';
import { Wrapper } from '@app/components/common/Avatar/Avatar.styles';

export const Avatar: React.FC<AvatarProps> = ({ firstName, lastName, imageUrl, size = AvatarSize.l }) => {
  return (
    <Wrapper size={size} className={`rounded-full bg-blue-700 flex justify-center items-center`}>
      {imageUrl ? (
        <img className="inline-block w-full h-full rounded-full" src={imageUrl} alt="User avatar" />
      ) : (
        <span className="text-2xl text-white">
          {firstName[0]}
          {lastName[0]}
        </span>
      )}
    </Wrapper>
  );
};
