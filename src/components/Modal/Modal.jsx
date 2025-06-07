import { useEffect, useRef } from "react";
// Ensure you have react-icons installed: npm install react-icons
import { FaTimes } from "react-icons/fa";

/**
 * Modal component displays a customizable overlay modal.
 * It takes an 'onClose' function to handle closing the modal from within itself.
 *
 * @param {object} props - Component props.
 * @param {function} props.onClose - Function to call when the modal needs to be closed.
 */
const Modal = ({ onClose }) => {
    // useRef to reference the modal content area for accessibility and focus management.
    const modalRef = useRef(null);

    // useEffect to manage focus when the modal opens and handle keyboard events (Escape key).
    useEffect(() => {
        // Focus the modal content when it opens for accessibility.
        modalRef.current?.focus();

        /**
         * Handles keydown events, specifically to close the modal with the Escape key.
         * @param {KeyboardEvent} event - The keyboard event object.
         */
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose(); // Call the onClose prop when Escape is pressed
            }
        };

        // Add event listener for keydown when the modal is mounted
        document.addEventListener("keydown", handleKeyDown);

        // Cleanup function: remove the event listener when the modal unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]); // Re-run effect if onClose function changes (though it typically won't)

    // Prevents clicks inside the modal content from bubbling up to the overlay.
    const handleContentClick = (event) => {
        event.stopPropagation();
    };

    return (
        // Full-screen overlay for the modal background.
        // 'fixed inset-0': covers the entire viewport.
        // 'bg-black bg-opacity-70': semi-transparent black background.
        // 'flex items-center justify-center': centers the modal content vertically and horizontally.
        // 'z-50': ensures it's on top of other content.
        // 'animate-fade-in': applies a fade-in animation to the overlay.
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in"
            onClick={onClose} // Close modal when clicking outside the content area
            role="dialog" // ARIA role for accessibility
            aria-modal="true" // Indicates that the dialog is modal
            aria-labelledby="modal-title" // Links to the modal title for screen readers
        >
            {/* Modal content container.
          'relative': for positioning inner elements.
          'bg-gray-900': dark background for the modal box.
          'rounded-2xl': rounded corners.
          'shadow-xl': prominent shadow.
          'p-6 sm:p-8 md:p-10': responsive padding.
          'max-w-md w-full': responsive width.
          'transform animate-scale-in': animation for the modal box itself.
          'focus:outline-none': removes default focus outline for better styling.
          'tabIndex="-1"': makes the div programmatically focusable. */}
            <div
                ref={modalRef} // Assign the ref to the modal content
                className="relative bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 max-w-md w-full text-white
                   transform animate-scale-in focus:outline-none"
                onClick={handleContentClick} // Prevent closing when clicking inside the content
                tabIndex="-1" // Make the modal content focusable
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-gray-700 hover:bg-gray-600 rounded-full
                     text-gray-300 hover:text-white transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-gray-500"
                    aria-label="Close modal" // Accessibility label
                >
                    <FaTimes size={20} /> {/* Close icon from react-icons */}
                </button>

                {/* Modal Title */}
                <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Welcome to Our Modal!
                </h2>

                {/* Modal Body Content */}
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-center mb-6">
                    This is a responsive and visually appealing modal window built with React and Tailwind CSS.
                    You can customize its content to display alerts, forms, or any other dynamic information.
                </p>
                <p className="text-sm text-gray-400 text-center">
                    Press ESC or click outside to close.
                </p>

                {/* Optional: Call to action button inside modal */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={onClose} // Closes modal
                        className="px-6 py-3 rounded-full text-base font-semibold
                       bg-gradient-to-r from-green-500 to-teal-600 text-white
                       shadow-md transition-all duration-300 transform
                       hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Got It!
                    </button>
                </div>
            </div>

            {/* Custom CSS for animations. These would typically be in your main index.css */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; }
      `}</style>
        </div>
    );
};

export default Modal;