import { AvatarProps, AvatarSize } from './Avatar.interface';

export const Avatar: React.FC<AvatarProps> = ({ firstName, lastName, imageUrl, size = AvatarSize.l }) => {
  return (
    <div className={`h-[${size}px] w-[${size}px] rounded-full bg-blue-700 flex justify-center items-center`}>
      {imageUrl ? (
        <img className="inline-block w-full h-full rounded-full" src={imageUrl} alt="User avatar" />
      ) : (
        <span className="text-2xl text-white">
          {firstName[0]}
          {lastName[0]}
        </span>
      )}
    </div>
  );
};
