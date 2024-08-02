import { ClassName, Option } from '@app/types/common';

export interface TabsProps {
  tabs: Array<Option & { href?: string }>;
  current: Option;
  onTabChange: (tab: Option) => void;
  className?: ClassName;
}
