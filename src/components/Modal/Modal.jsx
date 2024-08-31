import React from "react";

const Modal = ({ onClose }) => {
  return (
    <div className="bg-purple-600 h-screen fixed z-50 w-full top-0 text-white text-3xl font-semibold flex flex-col items-center gap-32 py-20 ">
      <div className="flex gap-32 bg-green-300 w-full justify-center text-5xl font-black">
        <span>HEADER</span>
        <button onClick={onClose} className="hover:text-violet-800">
          &times;
        </button>
      </div>
      <div className="bg-red-400 w-full min-h-44 flex justify-center p-10">
        <p className="">This is the body of the Modal</p>
      </div>
      <div className="bg-yellow-300 w-full py-2 px-10 flex justify-center">
        <p>This is the Footer of the Modal</p>
      </div>
    </div>
  );
};

export default Modal;
