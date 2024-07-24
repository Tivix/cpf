import { ReactNode } from 'react';

export interface AccordionListProps {
  items: {
    key: string;
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
