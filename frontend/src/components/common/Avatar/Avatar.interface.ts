export interface AvatarProps {
  size?: (typeof AvatarSize)[keyof typeof AvatarSize];
  firstName: string;
  lastName: string;
  imageUrl?: string | undefined;
}

export const AvatarSize = {
  XS: '28',
  S: '40',
  M: '56',
  L: '72',
  XL: '100',
  XXL: '320',
} as const;
