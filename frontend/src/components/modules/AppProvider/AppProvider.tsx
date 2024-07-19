import { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
