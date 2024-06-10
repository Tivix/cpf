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
        <div className="fixed w-full h-full inset-0 bg-navy-50/75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 z-10">
        <div className="flex justify-center h-full text-center items-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="overflow-y-auto relative h-full sm:max-h-[672px] text-left bg-white rounded-xl shadow-xl transition-all max-w-[80%] sm:max-w-2xl p-0 w-full">
              <div className="flex justify-between p-8">
                <Dialog.Title as="h3" className="text-xl font-medium text-navy-900">
                  {title}
                </Dialog.Title>
                <button onClick={onClose} type="button">
                  <CloseIcon className="h-5 w-5 text-navy-600 hover:text-navy-900" aria-hidden="true" />
                </button>
              </div>

              <Dialog.Description className="py-5 px-8">{children}</Dialog.Description>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);
