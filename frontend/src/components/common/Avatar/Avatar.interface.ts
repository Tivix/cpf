export interface AvatarProps {
  size?: AvatarSize;
  firstName: string;
  lastName: string;
  imageUrl?: string;
}

export enum AvatarSize {
  xs = 28,
  s = 40,
  m = 56,
  l = 72,
  xl = 100,
  xxl = 320,
}
