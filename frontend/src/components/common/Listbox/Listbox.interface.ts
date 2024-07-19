import { Option } from '../Combobox';

export interface ListboxProps {
  name: string;
  options: Option[];
  placeholder?: string;
  onClear?: () => void;
}
