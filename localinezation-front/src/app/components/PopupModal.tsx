import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen?: boolean;
  message?: string;
  onClose?: () => void;
  switchBool?: boolean;
  onClickParam?: any;
}

const PopupModal: React.FC<ModalProps> = ({
  isOpen = false,
  message,
  onClose,
  switchBool,
  onClickParam,
}) => {

  if (!isOpen) return null;

//   useEffect(() => {
    
//   }, [])

  // const handleModal = () => {
  //   setIsModalOpen(false)
  //   setLoginSwitchBool(true)
  // }

  return (
    <div className={`fixed inset-0 bg-gray-900 bg-opacity-70 overflow-y-auto h-full w-full flex items-center justify-center${isOpen ? '' : ' hidden'}`}>
      <div
        className="bg-white rounded-md shadow-lg mx-4"
        style={{ minWidth: "300px", maxWidth: "500px" }}
      >
        <div className="text-center p-5">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  switchBool
                    ? "M5 13l4 4L19 7"
                    : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                }
              />
            </svg>
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 mt-3">
            {message}
          </h3>
          <div className="mt-5">
            <button
              onClick={() => {
                {
                  isOpen = false;
                  onClickParam;
                }
              }}
              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;