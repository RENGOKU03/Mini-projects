import React from "react";

const Suggestion = ({ data, handleClick }) => {
  return (
    <div className=" font-semibold text-3xl min-h-56 text-center ">
      <ul>
        {data && data.length
          ? data.map((item, index) => (
              <li
                key={index}
                onClick={handleClick}
                className="border-2 border-black w-80 rounded-3xl m-auto hover:bg-gray-700"
              >
                {item}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default Suggestion;
