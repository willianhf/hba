import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react';
import { Button } from './Button';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children?: never;
  body: React.ReactNode;
  footer?: React.ReactNode;
  initialFocus?: React.MutableRefObject<any>;
}

export function Modal({ title, isOpen, onClose, body, footer, initialFocus }: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={isOpen}
        onClose={onClose}
        initialFocus={initialFocus}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between">
                  <Dialog.Title as="h3" className="text-2xl leading-6 font-semibold text-gray-900">
                    {title}
                  </Dialog.Title>
                  <Button variant="link" className="text-gray-400 hover:text-gray-600" onClick={onClose}>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </div>
                <div className="mt-4">{body}</div>
              </div>
              {footer && <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">{footer}</div>}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
