import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';

import type { ModalProps } from './Modal.interface';
import { CloseIcon } from '@app/static/icons/CloseIcon';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const Modal = ({ children, open, onClose, title, headerCloseButton = true }: ModalProps) => (
  <Transition show={open} as={Fragment}>
    <Dialog as="div" className={`${inter.className} relative z-50`} onClose={onClose}>
      <TransitionChild
        as={Fragment}
        enter="ease-out duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 h-full w-full bg-navy-50/75 transition-opacity" />
      </TransitionChild>

      <div className="fixed inset-0 z-10 flex h-full items-center justify-center">
        <div className="flex max-h-full items-center justify-center text-center">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPanel className="relative h-full w-full min-w-[534px] max-w-[80%] rounded-xl bg-white p-8 text-left shadow-xl transition-all sm:max-h-[672px] sm:max-w-2xl">
              <div className="mb-6 flex justify-between">
                <DialogTitle as="h3" className="text-xl font-medium text-navy-900">
                  {title}
                </DialogTitle>
                {headerCloseButton && (
                  <button onClick={onClose} type="button">
                    <CloseIcon className="h-5 w-5 text-navy-600 hover:text-navy-900" aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="max-h-[calc(100%-6rem)] overflow-y-auto">{children}</div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </Transition>
);
