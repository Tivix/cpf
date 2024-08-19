export const getInitials = (text: string) => {
  return text
    .split(' ')
    .map((word) => word[0])
    .join('');
};
