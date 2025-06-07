// OutsideClick.jsx
import React, { useRef, useState } from "react";
import UseOnClickOutside from "./UseOnClickOutside"; // Ensure this path is correct

/**
 * OutsideClick component demonstrates a custom hook to detect clicks outside a specified element.
 * It shows a content box when a button is clicked, and hides it when a click occurs anywhere outside the box.
 */
const OutsideClick = () => {
  // State to control the visibility of the content box.
  const [showContent, setShowContent] = useState(false);

  // useRef to create a reference to the content box DOM element.
  // This ref is passed to the UseOnClickOutside hook.
  const contentRef = useRef();

  // Use the custom hook: whenever a click occurs outside 'contentRef',
  // the callback function (setting setShowContent(false)) is executed.
  UseOnClickOutside(contentRef, () => setShowContent(false));

  return (
      // Main container for the component.
      // Full screen height, vibrant gradient background, centers content, and provides responsive padding.
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8
                    bg-gradient-to-br from-yellow-600 via-amber-700 to-orange-800 text-white overflow-hidden">

        {/* Component Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-12 text-center
                     text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400 
                     drop-shadow-lg animate-fade-in-down">
          Click Outside Detector
        </h1>

        {/* Conditionally render the 'Show Content' button */}
        {!showContent ? (
            <button
                onClick={() => setShowContent(true)} // Set showContent to true to display the box
                className="px-10 py-4 rounded-full text-xl sm:text-2xl md:text-3xl font-bold
                     bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                     shadow-lg transition-all duration-300 transform 
                     hover:scale-105 hover:shadow-xl active:scale-95 
                     focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75
                     animate-pop-in"
                aria-expanded={showContent ? "true" : "false"} // Accessibility for button state
            >
              Click to Show Content
            </button>
        ) : null}

        {/* Conditionally render the content box */}
        {showContent && (
            <div
                ref={contentRef} // Assign the ref to this div so the hook can track clicks outside it
                className="bg-gray-800 bg-opacity-85 w-full max-w-lg md:max-w-xl lg:max-w-2xl
                     p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl 
                     text-white text-center border border-gray-700
                     transform transition-all duration-500 animate-scale-in"
                role="dialog" // ARIA role for accessibility
                aria-modal="true" // Indicates that the element is a modal dialog
                aria-label="Content box, click outside to close" // Accessibility label
            >
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-relaxed mb-4">
                Hello! This is the content box.
              </p>
              <p className="text-base sm:text-lg text-gray-300">
                Click anywhere *outside* this box to make it disappear.
                It's a useful pattern for dropdowns, modals, or sidebars.
              </p>
            </div>
        )}

        {/* Custom CSS for animations. These should ideally be in your main index.css
          or a global stylesheet for production, but are included here for demonstration. */}
        <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; }
        .animate-pop-in { animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; }
        .animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; }
      `}</style>
      </div>
  );
};

export default OutsideClick;