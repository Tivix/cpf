import { ComponentProps } from 'react';

interface Tab {
  title: string;
  count?: number;
}

export interface TabsProps {
  tabs: Tab[];
  active: string;
  setActive: (active: string) => void;
  className?: ComponentProps<'nav'>['className'];
}
