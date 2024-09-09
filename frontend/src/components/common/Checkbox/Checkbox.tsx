import { FC } from 'react';
import { Checkbox as HeadlessCheckbox } from '@headlessui/react';
import { generateClassNames } from '@app/utils';
import { useController, useFormContext } from 'react-hook-form';
import { CheckboxProps } from './Checkbox.interface';

const styles: { [checked: string]: { [disabled: string]: string } } = {
  true: {
    true: 'bg-blue-800 opacity-50', // checked disabled
    false: 'bg-blue-800 hover:bg-blue-900', // checked enabled
  },
  false: {
    true: 'bg-navy-200', // unchecked disabled
    false: 'bg-white border border-navy-300 hover:border-navy-400', // unchecked enabled
  },
};

export const Checkbox: FC<CheckboxProps> = (props) => {
  const { name, id, disabled, handleChange, checked = false } = props;
  const form = useFormContext();
  const { field } = useController({ name, control: form.control });
  const selected = field?.value?.selected;

  const currentStyles = styles[(selected ?? false).toString()][(disabled ?? false).toString()];

  return (
    <HeadlessCheckbox
      className={generateClassNames('flex h-6 w-6 cursor-pointer items-center justify-center rounded', currentStyles)}
      {...field}
      onChange={(selected) => {
        if (handleChange) {
          handleChange(name, selected);
        }

        field.onChange({
          id: id,
          selected: selected,
        });
      }}
      checked={selected ?? checked}
      onClick={(e) => e.stopPropagation()}
      value={selected ?? checked}
    >
      {selected && (
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.2559 0.410765C15.5814 0.736202 15.5814 1.26384 15.2559 1.58928L6.08926 10.7559C5.76382 11.0814 5.23618 11.0814 4.91074 10.7559L0.744078 6.58928C0.418641 6.26384 0.418641 5.7362 0.744078 5.41077C1.06951 5.08533 1.59715 5.08533 1.92259 5.41077L5.5 8.98818L14.0774 0.410765C14.4028 0.0853278 14.9305 0.0853278 15.2559 0.410765Z"
            fill="white"
          />
        </svg>
      )}
    </HeadlessCheckbox>
  );
};
