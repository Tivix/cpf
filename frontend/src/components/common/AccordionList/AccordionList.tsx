import { PropsWithChildren } from 'react';
import { AccordionListProps } from './AccordionList.interface';
import { AccordionListItem } from './AccordionListItem';

export const AccordionList = ({ items }: PropsWithChildren<AccordionListProps>) => {
  return (
    <div className="flex flex-col">
      {items.map(({ title, children }) => (
        <AccordionListItem title={title}>{children}</AccordionListItem>
      ))}
    </div>
  );
};
