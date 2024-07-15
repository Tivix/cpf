import { useState } from 'react';

export const useBucketDetails = () => {
  const [levelOpen, setLevelOpen] = useState<null | number>(null);

  const handleOpen = (level: null | number) => {
    setLevelOpen((prev) => (prev === level ? null : level));
  };

  return {
    levelOpen,
    handleOpen,
  };
};
