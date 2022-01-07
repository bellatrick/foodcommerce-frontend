import React from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Uk from "../assets/Uk.png";
import Nig from "../assets/Nigeria.png";
import wme from "../assets/wme.png";
export default function Modal({ open, setOpen, no1, no2, message }) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto animate-pulse flex items-center justify-center h-12 w-12 rounded-full bg-transparent">
                  <img src={wme} alt="" className="w-10 h-10" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                    data-testid="modal-head"
                  ></Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-primary font-bold text-center">
                      Please select one of the button below to contact the
                      seller on Whatsapp
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-col px-4 sm:px-16">
                <div className="w-64 mx-auto">
                  <a
                    href={`https://wa.me/${no1}/?text=${message}`}
                    rel="noreferrer"
                    type="button"
                    className="w-full inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-16 py-2 my-5 bg-primary text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100 sm:col-start-2 sm:text-sm"
                  >
                    {" "}
                    <img src={Nig} alt="" className="mr-3" />
                    Nigeria <div className="ml-4 w-6"></div>
                  </a>
                </div>
                <div className="w-64 mx-auto">
                  <a
                    href={`https://wa.me/${no2}/?text=${message}`}
                    rel="noreferrer"
                    target="_blank"
                    type="button"
                    className="mt-3 w-full inline-flex items-center text-sm justify-center rounded-md border border-gray-300 shadow-sm px-16 py-2 bg-primary font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100 sm:mt-0 sm:col-start-1 sm:text-sm"
                    ref={cancelButtonRef}
                  >
                    {" "}
                    <img src={Uk} alt="" className="mr-3" />
                    UK <div className="ml-4  w-6"></div>
                  </a>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
