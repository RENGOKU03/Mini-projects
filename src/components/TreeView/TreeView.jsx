import React from "react";
import MenuList from "./MenuList";

const TreeView = ({ menus = [] }) => {
  return (
    <div className="bg-red-200 h-screen snap-start overflow-hidden">
      <h1 className="text-5xl font-semibold text-center p-10">Tree View</h1>
      <div className="w-1/2 m-auto rounded-3xl bg-red-400 h-[80%]">
        <MenuList list={menus} />
      </div>
    </div>
  );
};

export default TreeView;
