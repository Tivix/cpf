import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import type { ModalProps } from './Modal.interface';
import { CloseIcon } from '@app/static/icons/CloseIcon';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const Modal = ({ children, open, onClose, title }: ModalProps) => (
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

      <div className="fixed inset-0 z-10">
        <div className="flex h-full items-center justify-center text-center">
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
                <button onClick={onClose} type="button">
                  <CloseIcon className="h-5 w-5 text-navy-600 hover:text-navy-900" aria-hidden="true" />
                </button>
              </div>

              <Dialog.Description className="h-[calc(100%-6rem)] overflow-y-auto px-8 py-5">
                {children}
              </Dialog.Description>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);
