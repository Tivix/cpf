import { Option } from '../Combobox';

export interface TabsProps {
  tabs: Array<Option & { href?: string }>;
  current: Option;
  onTabChange: (tab: Option) => void;
  className?: string;
}
