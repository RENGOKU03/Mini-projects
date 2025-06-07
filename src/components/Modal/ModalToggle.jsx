import { useState } from "react";
import Modal from "./Modal"; // Ensure the path to your Modal component is correct

/**
 * ModalToggle component is a parent component that manages the visibility of a modal.
 * It provides a button to open the modal and integrates the Modal component.
 */
const ModalToggle = () => {
    // State to control whether the modal is currently shown or hidden.
    const [showModal, setShowModal] = useState(false);

    /**
     * Toggles the 'showModal' state, effectively opening or closing the modal.
     */
    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    /**
     * Callback function passed to the Modal component.
     * Sets 'showModal' to false, which closes the modal.
     * This function is typically called from within the Modal (e.g., by clicking a close button).
     */
    const onClose = () => {
        setShowModal(false);
    };

    return (
        // Main container for the ModalToggle component.
        // Uses a full viewport height, a modern gradient background, and centers content.
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8
                    bg-gradient-to-br from-teal-700 via-blue-800 to-indigo-900 text-white overflow-hidden">

            {/* Page Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-16 text-center
                     text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400
                     drop-shadow-lg animate-fade-in-down">
                Interactive Modal
            </h1>

            {/* Button to open the modal */}
            <button
                onClick={handleToggleModal}
                className="px-10 py-4 rounded-full text-xl sm:text-2xl md:text-3xl font-bold
                   bg-gradient-to-r from-purple-500 to-pink-600 text-white
                   shadow-lg transition-all duration-300 transform
                   hover:scale-105 hover:shadow-xl active:scale-95
                   focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75
                   animate-pop-in"
                aria-controls="my-modal" // For accessibility, links button to modal
                aria-expanded={showModal ? "true" : "false"} // Indicates modal's open/closed state
            >
                Open Our Awesome Modal!
            </button>

            {/* Conditionally render the Modal component based on 'showModal' state.
          Pass the 'onClose' function as a prop for the modal to call when it needs to close. */}
            {showModal && <Modal onClose={onClose} />}

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
        .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; }
        .animate-pop-in { animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; }
      `}</style>
        </div>
    );
};

export default ModalToggle;