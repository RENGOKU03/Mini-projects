import React, { useState } from "react";
import data from "./data";

const Accordian = () => {
  const [selected, setSelected] = useState(null);
  const [multiSelect, setMultiSelect] = useState(false);
  const [multiple, setMultiple] = useState([]);
  const handelSingleSelect = (itemid) => {
    setSelected(selected === itemid ? null : itemid);
  };
  const handelMultiSelect = (itemid) => {
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentItem = cpyMultiple.indexOf(itemid);
    if (findIndexOfCurrentItem === -1) {
      cpyMultiple.push(itemid);
    } else {
      cpyMultiple.splice(findIndexOfCurrentItem, 1);
    }
    setMultiple(cpyMultiple);
  };

  return (
    <div className="h-screen w-full bg-red-100 box-border snap-start">
      <div className="py-10">
        <button
          className="bg-red-700 p-4 text-3xl rounded-3xl flex m-auto align-middle text-white font-semibold "
          onClick={() => setMultiSelect(!multiSelect)}
        >
          {multiSelect ? "Disable Multi Select" : "Enable Multi Select"}
        </button>
      </div>

      <div>
        {data.map((item, index) => (
          <div key={index} className="min-w-[40%] max-w-[80%] m-auto">
            <p
              onClick={
                multiSelect
                  ? () => handelMultiSelect(item.id)
                  : () => handelSingleSelect(item.id)
              }
              className="bg-red-400 h-16 text-xl font-semibold px-4 mt-3 rounded-xl"
            >
              {item.question}
            </p>
            <hr className="bg-red-900 h-1 w-[95%] m-auto " />
            {multiSelect
              ? multiple.indexOf(item.id) !== -1 && (
                  <div className="bg-red-500 p-5 rounded-xl text-xl">
                    {item.answer}
                  </div>
                )
              : selected === item.id && (
                  <div className="bg-red-500 p-5 rounded-xl text-xl">
                    {item.answer}
                  </div>
                )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordian;
