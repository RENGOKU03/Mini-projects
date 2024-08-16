import React, { useEffect, useRef, useState } from "react";

const LoadMoreData = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const divRef = useRef();

  function handleLoadMoreButton() {
    divRef.current?.scrollIntoView({ behaviour: "smooth" });
    setCount(count + 1);
  }

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${count * 20}`
      );
      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
        setLoading(false);
      }
    } catch (e) {
      alert(e);
    }
  }
  useEffect(() => {
    fetchData();
  }, [count]);

  useEffect(() => {
    if (products && products.length === 100) setDisableButton(true);
  }, [products]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" bg-red-700 flex flex-col items-center gap-5">
      <h1 className="text-5xl font-semibold text-center p-5" ref={divRef}>
        Load More Function
      </h1>
      <div className="grid grid-cols-5 gap-5 w-[90%] m-auto ">
        {products && products.length
          ? products.map((item) => (
              <div key={item.id} className="bg-pink-400/30 rounded-3xl">
                <img
                  src={item.thumbnail}
                  alt={item.id}
                  className="bg-pink-400/30 rounded-t-3xl"
                />
                <p className="text-xl px-3">{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="pb-10">
        <button
          disabled={disableButton}
          onClick={handleLoadMoreButton}
          className="text-2xl tracking-wide font-semibold px-4 py-2 bg-yellow-300 rounded-xl min-w-96"
        >
          {disableButton ? "You Have Reached 100 products" : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default LoadMoreData;
