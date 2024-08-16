import React from "react";
import MenuItem from "./MenuItem";

const MenuList = ({ list = [] }) => {
  return (
    <ul className="list-none text-2xl font-medium px-5 py-3 rounded-3xl">
      {list && list.length
        ? list.map((listItem) => (
            <MenuItem item={listItem} key={listItem.label} />
          ))
        : null}
    </ul>
  );
};

export default MenuList;
