export interface AvatarProps {
  size?: AvatarSize;
  firstName: string;
  lastName: string;
  imageUrl?: string | undefined;
}

export type AvatarSize = '28' | '40' | '56' | '72' | '100' | '320';
