import React, { useRef } from "react";
import UseFetch from "../UseFetch/UseFetch";
import Loading from "../Loading";

const Scroll = () => {
  const { data, error, pending } = UseFetch(
    "https://dummyjson.com/products?limit=100"
  );
  const bottomRef = useRef(null);
  const topRef = useRef(null);
  function handleBottomClick() {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }
  function handleTopClick() {
    topRef.current.scrollIntoView({ behavior: "smooth" });
  }
  if (error) {
    return (
      <div>
        <h1>{`Error ${error}`}</h1>
      </div>
    );
  }
  if (pending) {
    return <Loading />;
  }
  return (
    <div className="snap-start bg-orange-500 pb-4">
      <h1 className="text-5xl font-semibold text-center p-5" ref={topRef}>
        Scroll to Bottom and Top
      </h1>
      <div className="flex flex-col items-center gap-4 ">
        <button
          onClick={handleBottomClick}
          className="bg-orange-800 px-3 py-2 text-2xl font-semibold text-white rounded-3xl max-w-56"
        >
          Scroll To Bottom
        </button>
        <ul>
          {data && data.products && data.products.length
            ? data.products.map((item, index) => (
                <li key={index} className="text-xl text-white">
                  {item.title}
                </li>
              ))
            : null}
        </ul>
        <button
          onClick={handleTopClick}
          className="bg-orange-800 px-3 py-2 text-2xl font-semibold rounded-3xl max-w-56 text-white"
        >
          Scroll To Top
        </button>
        <div ref={bottomRef}>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Scroll;
