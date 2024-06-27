import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import type { ModalProps } from './Modal.interface';
import { CloseIcon } from '@app/static/icons/CloseIcon';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const Modal = ({ children, open, onClose, title, hideHeaderCloseButton }: ModalProps) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className={`${inter.className} relative z-50`} onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 h-full w-full bg-navy-50/75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 z-10 h-full flex items-center justify-center">
        <div className="flex justify-center max-h-full items-center text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="relative h-full w-full max-w-[80%] rounded-xl bg-white p-0 text-left shadow-xl transition-all sm:max-h-[672px] sm:max-w-2xl">
              <div className="flex justify-between p-8">
                <Dialog.Title as="h3" className="text-xl font-medium text-navy-900">
                  {title}
                </Dialog.Title>
                {!hideHeaderCloseButton && (
                  <button onClick={onClose} type="button">
                    <CloseIcon className="h-5 w-5 text-navy-600 hover:text-navy-900" aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="overflow-y-auto py-5 px-8 max-h-[calc(100%-6rem)]">{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);
