import { ComponentProps } from 'react';

interface Tab {
  title: string;
  employees: number;
}

export interface TabsProps {
  tabs: Tab[];
  active: Tab;
  setActive: (active: Tab) => void;
  className?: ComponentProps<'nav'>['className'];
}
