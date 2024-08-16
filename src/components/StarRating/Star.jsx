import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";

const Star = ({ len = 10 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const handelonClick = (index) => {
    setRating(index);
  };
  const handelMouseMove = (index) => {
    setHover(index);
  };
  const handelMouseLeave = () => {
    setHover(rating);
  };
  return (
    <div className="h-screen bg-red-400 flex flex-col justify-center gap-32 snap-start">
      <h1 className="text-5xl font-semibold text-center">Star Rating</h1>
      <div className="w-full flex justify-center gap-2">
        {[...Array(len)].map((item, index) => {
          index += 1;
          return (
            <FaStar
              key={index}
              color={index <= (hover || rating) ? "Yellow" : "Black"}
              size={"50px"}
              onClick={() => handelonClick(index)}
              onMouseMove={() => handelMouseMove(index)}
              onMouseLeave={() => handelMouseLeave()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Star;
