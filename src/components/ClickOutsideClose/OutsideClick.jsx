import React, { useRef, useState } from "react";
import UseOnClickOutside from "./UseOnClickOutside";

const OutsideClick = () => {
  const [showContent, setShowContent] = useState(false);
  const ref = useRef();
  UseOnClickOutside(ref, () => setShowContent(false));
  return (
    <div className="h-screen bg-amber-300 font-semibold flex flex-col items-center">
      <h1 className=" text-5xl text-center p-10">Onclick Outside the Box</h1>

      {!showContent ? (
        <button
          onClick={() => setShowContent(true)}
          className="bg-red-100 px-3 py-2 text-2xl rounded-3xl max-w-96"
        >
          Click to Show Content
        </button>
      ) : null}
      {showContent && (
        <div
          ref={ref}
          className="bg-amber-600 w-3/4 m-auto min-h-80 rounded-3xl"
        >
          <p className="text-4xl text-white p-10 text-center">
            Click outside the box to close the modal
          </p>
        </div>
      )}
    </div>
  );
};

export default OutsideClick;
