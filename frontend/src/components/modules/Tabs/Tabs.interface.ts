import { Option } from '@app/components/common/Combobox';
import { ComponentProps } from 'react';

export interface TabsProps {
  tabs: Option[];
  active: Option;
  onChange: (active: Option) => void;
  className?: ComponentProps<'nav'>['className'];
}
