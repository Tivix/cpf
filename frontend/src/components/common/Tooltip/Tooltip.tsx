'use client';
import { FC, PropsWithChildren, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { TooltipProps } from './Tooltip.interface';

export const TooltipPopover: FC<PropsWithChildren<TooltipProps>> = ({ tooltipText, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover className="relative">
      <Popover.Button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="focus:outline-none"
      >
        {children}
      </Popover.Button>
      <Transition
        show={open}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel static className={`absolute z-10 w-screen max-w-max rounded bg-grey-800 px-3 py-2`}>
          <div className="max-w-[480px] text-sm text-white shadow-lg">
            <p>{tooltipText}</p>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};