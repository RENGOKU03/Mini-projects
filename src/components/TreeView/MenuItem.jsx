import React, { useState } from "react";
// Ensure you have react-icons installed: npm install react-icons
import { FaMinus, FaPlus } from "react-icons/fa";
import MenuList from "./MenuList"; // Import MenuList for recursive rendering of children

/**
 * MenuItem component represents an individual item in the tree view.
 * It handles displaying the item's label and toggling the visibility of its children.
 *
 * @param {object} props - Component props.
 * @param {object} props.item - The menu item object, potentially containing 'label' and 'children'.
 */
const MenuItem = ({ item }) => {
  // State to manage the visibility of children for each menu item.
  // The object keys are item labels, and values are booleans (true for expanded, false for collapsed).
  const [displayCurrentChildren, setDisplayCurrentChildren] = useState({});

  /**
   * Toggles the visibility of children for a given menu item.
   * Updates the 'displayCurrentChildren' state for the specific item label.
   *
   * @param {string} getCurrentLabel - The label of the menu item whose children are being toggled.
   */
  const handleToggleChildren = (getCurrentLabel) => {
    setDisplayCurrentChildren({
      ...displayCurrentChildren, // Keep existing states for other items
      [getCurrentLabel]: !displayCurrentChildren[getCurrentLabel], // Toggle the current item's state
    });
  };

  return (
      // List item container. Uses responsive padding for nested items to show hierarchy.
      <li className="mb-1">
        <div
            className="flex items-center gap-3 sm:gap-4 cursor-pointer p-2 rounded-lg
                   bg-gray-700 hover:bg-gray-600 transition-colors duration-200 shadow-sm"
        >
          {/* Item Label */}
          <p className="flex-grow text-gray-100 text-base sm:text-lg md:text-xl font-medium">
            {item.label}
          </p>

          {/* Conditional rendering for expand/collapse icon.
            Only shows if the item has children. */}
          {item && item.children && item.children.length > 0 ? (
              <span
                  onClick={() => handleToggleChildren(item.label)}
                  className="flex-shrink-0 p-1 rounded-full bg-blue-500 hover:bg-blue-600
                       transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
            {displayCurrentChildren[item.label] ? (
                // Minus icon when children are displayed
                <FaMinus color="#fff" size={18} /> // Responsive icon size
            ) : (
                // Plus icon when children are hidden
                <FaPlus color="#fff" size={18} /> // Responsive icon size
            )}
          </span>
          ) : null}
        </div>

        {/* Recursive rendering of children:
          Only render MenuList if the item has children AND they are currently expanded. */}
        {item &&
        item.children &&
        item.children.length > 0 &&
        displayCurrentChildren[item.label] ? (
            // Apply left padding to nested lists to create the tree hierarchy visual
            <div className="pl-4 sm:pl-6 md:pl-8 pt-1">
              <MenuList list={item.children} />
            </div>
        ) : null}
      </li>
  );
};

export default MenuItem;