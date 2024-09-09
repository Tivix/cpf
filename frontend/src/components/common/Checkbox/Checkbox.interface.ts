export interface CheckboxProps {
  name: string;
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  handleChange?: (name: string, selected: boolean) => void;
}
