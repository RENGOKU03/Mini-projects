import React from "react";
import UseFetch from "./UseFetch";

const CustomHook = () => {
  const { data, error, pending } = UseFetch("https://dummyjson.com/products");
  return (
    <div className="bg-blue-400 text-center ">
      <h1 className=" font-semibold text-5xl p-10">Use Fetch Hook</h1>
      {pending ? <h2>Pending ! Please wait</h2> : null}
      {error ? <h2>{error}</h2> : null}
      {data && data.products && data.products.length
        ? data.products.map((product, index) => (
            <p key={index} className="text-2xl text-center">
              {product.title}
            </p>
          ))
        : null}
    </div>
  );
};

export default CustomHook;
