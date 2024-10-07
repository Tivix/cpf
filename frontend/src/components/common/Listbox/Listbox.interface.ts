import { ClassName, Option } from '@app/types/common';

export interface ListboxProps {
  name: string;
  options: Option[];
  placeholder?: string;
  onClear?: () => void;
  className?: ClassName;
  showClearButton?: boolean;
}
