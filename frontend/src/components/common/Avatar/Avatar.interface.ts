export interface AvatarProps {
  variant?: AvatarVariant;
  firstName: string;
  lastName: string;
  imageUrl?: string | undefined;
}

export type AvatarVariant = '28' | '40' | '56' | '72' | '100' | '320';
