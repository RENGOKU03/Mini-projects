import React, { useState } from "react";
import data from "./data";

const Accordion = () => {
  // State management
  const [selected, setSelected] = useState(null); // Currently selected item (single select mode)
  const [multiSelect, setMultiSelect] = useState(false); // Toggle between single/multi select
  const [multiple, setMultiple] = useState([]); // Array of selected items (multi select mode)

  /**
   * Handles selection in single-select mode
   * @param {number} itemId - The ID of the clicked item
   */
  const handleSingleSelect = (itemId) => {
    setSelected(selected === itemId ? null : itemId); // Toggle selection
  };

  /**
   * Handles selection in multi-select mode
   * @param {number} itemId - The ID of the clicked item
   */
  const handleMultiSelect = (itemId) => {
    setMultiple(prev => {
      // If item is already selected, remove it
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      }
      // Otherwise add it to selection
      return [...prev, itemId];
    });
  };

  return (
      <div className="min-h-screen snap-start w-full bg-gradient-to-b from-red-50 to-red-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with toggle button */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-red-800">FAQ Accordion</h1>
            <button
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                    multiSelect
                        ? "bg-red-700 text-white hover:bg-red-800"
                        : "bg-white text-red-700 border-2 border-red-700 hover:bg-red-50"
                } shadow-md hover:shadow-lg`}
                onClick={() => setMultiSelect(!multiSelect)}
                aria-label={multiSelect ? "Disable multi-select" : "Enable multi-select"}
            >
              {multiSelect ? "Disable Multi Select" : "Enable Multi Select"}
            </button>
          </div>

          {/* Accordion items */}
          <div className="space-y-4">
            {data.map((item) => (
                <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  {/* Question/Header */}
                  <button
                      onClick={() =>
                          multiSelect
                              ? handleMultiSelect(item.id)
                              : handleSingleSelect(item.id)
                      }
                      className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                      aria-expanded={
                        multiSelect
                            ? multiple.includes(item.id)
                            : selected === item.id
                      }
                  >
                    <h2 className="text-xl font-semibold text-red-900">
                      {item.question}
                    </h2>
                    <span className="text-red-700 text-2xl transition-transform duration-300">
                  {multiSelect
                      ? multiple.includes(item.id) ? "−" : "+"
                      : selected === item.id ? "−" : "+"}
                </span>
                  </button>

                  {/* Answer/Content (conditionally rendered) */}
                  {(multiSelect
                      ? multiple.includes(item.id)
                      : selected === item.id) && (
                      <div className="px-6 pb-6 pt-0 bg-red-50 text-red-800">
                        <p className="text-lg">{item.answer}</p>
                      </div>
                  )}
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Accordion;