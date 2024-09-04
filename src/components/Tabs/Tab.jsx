import React, { useState } from "react";

const Tab = ({ tabsContent }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const handelOnClick = (index) => {
    setCurrentTabIndex(index);
  };
  return (
    <div className="bg-red-400 h-screen snap-start text-5xl font-bold text-center">
      <h1 className=" py-10">Tabs Content</h1>
      <div className="flex gap-10 justify-evenly">
        {tabsContent.map((tabItem, index) => (
          <div
            key={index}
            onClick={() => handelOnClick(index)}
            className={`${
              currentTabIndex === index ? "bg-green-400" : "bg-yellow-200"
            } p-4 rounded-xl hover:cursor-pointer border-2 border-transparent hover:border-black`}
          >
            <span>{tabItem.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-20 bg-red-700 min-h-44 p-4 w-[95%] m-auto rounded-3xl">
        {tabsContent[currentTabIndex] && tabsContent[currentTabIndex].content}
      </div>
    </div>
  );
};

export default Tab;
