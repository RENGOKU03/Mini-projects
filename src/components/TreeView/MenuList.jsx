import React from "react";
import MenuItem from "./MenuItem"; // Import the MenuItem component

/**
 * MenuList component is a recursive component that renders a list of menu items.
 * It iterates through the 'list' prop and renders a MenuItem for each item.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} [props.list=[]] - An array of menu items to display.
 */
const MenuList = ({ list = [] }) => {
  return (
      // Unordered list container for menu items.
      // Uses Tailwind for styling: no default list style, bold text, responsive padding.
      <ul className="list-none text-base sm:text-lg md:text-xl font-medium px-2 py-1">
        {list && list.length > 0 ? ( // Check if the list exists and has items
            list.map((listItem, index) => (
                // Render a MenuItem for each item in the list.
                // Using listItem.label as key is common but can be problematic if labels aren't unique.
                // For robust keys, consider using a unique ID from your data or combine label with index.
                <MenuItem item={listItem} key={listItem.label || index} />
            ))
        ) : (
            // Optional: Message if the list is empty (e.g., for debugging or empty states)
            <p className="text-gray-400 text-center py-4">No menu items to display.</p>
        )}
      </ul>
  );
};

export default MenuList;