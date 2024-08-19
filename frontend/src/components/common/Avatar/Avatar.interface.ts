export interface AvatarProps {
  variant?: AvatarVariant;
  initials: string;
  imageUrl?: string | undefined;
}

export type AvatarVariant = '28' | '40' | '56' | '72' | '100' | '320';
