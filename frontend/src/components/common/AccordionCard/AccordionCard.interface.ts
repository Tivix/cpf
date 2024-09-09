import { AtomicSkill } from '@app/types/library';

export interface AccordionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  expandedByDefault?: boolean;
  small?: boolean;
  checkboxName?: string;
  handleSelectAll?: (name: string, selected: boolean, skills?: AtomicSkill[]) => void;
}
