import { PropsWithChildren } from 'react';
import { AccordionListProps } from './AccordionList.interface';
import { AccordionListItem } from './AccordionListItem';
import { Checkbox } from '../Checkbox';

export const AccordionList = ({ items, checkboxName }: PropsWithChildren<AccordionListProps>) => {
  return (
    <div className="flex flex-col">
      {items.map(({ title, children, key, icon }) => {
        return (
          <div key={key} className="flex items-center">
            {checkboxName && <Checkbox name={`${checkboxName}.${key}`} id={key.toString()} />}
            <AccordionListItem title={title} noContentTooltipText="There's no description for this skill." icon={icon}>
              {children}
            </AccordionListItem>
          </div>
        );
      })}
    </div>
  );
};
