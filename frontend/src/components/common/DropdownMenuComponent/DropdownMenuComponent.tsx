import { DotsIcon } from '@app/static/icons/DotsIcon';
import { generateClassNames } from '@app/utils';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { DropdownMenuComponentProps } from './DropdownMenuComponent.interface';
import { tabs } from '@app/const';

export const DropdownMenuComponent = ({ tabSelected }: DropdownMenuComponentProps) => {
  return (
    <div
      className={generateClassNames('justify-center [&]:p-0', {
        'justify-end': tabSelected === tabs[2].title,
      })}
    >
      <Menu>
        <MenuButton className="flex h-11 w-11 cursor-pointer items-center justify-center">
          <DotsIcon className="h-[18px] w-[18px]" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-60 origin-top-right rounded-xl border border-[#E6E8EE] bg-white py-[6px] text-navy-700 shadow-[0_2px_6px_0_#383A441A] *:flex *:h-11 *:w-full *:items-center *:px-3"
          >
            {tabSelected === tabs[0].title
              ? tabs[0].employeeActions.map((action, index) => (
                  <MenuItem key={index}>
                    <button>{action}</button>
                  </MenuItem>
                ))
              : tabSelected === tabs[1].title
                ? tabs[1].employeeActions.map((action, index) => (
                    <MenuItem key={index}>
                      <button>{action}</button>
                    </MenuItem>
                  ))
                : tabs[2].employeeActions.map((action, index) => (
                    <MenuItem key={index}>
                      <button>{action}</button>
                    </MenuItem>
                  ))}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};
