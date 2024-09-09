import { ReactNode } from 'react';

export interface AccordionListProps {
  checkboxName?: string;
  items: {
    key: string | number;
    title: string;
    children?: ReactNode;
    icon?: ReactNode;
  }[];
}

export interface AccordionListItemProps {
  title: string;
  noContentTooltipText: string;
  icon?: ReactNode;
}
