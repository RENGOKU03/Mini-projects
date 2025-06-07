import { useRef, useState } from "react";
// Ensure you have react-qr-code installed: npm install react-qr-code
import QRCode from "react-qr-code";

/**
 * QRCodeGenerator component allows users to generate QR codes from text input.
 * It features a clean, responsive design with interactive elements.
 */
const QRCodeGenerator = () => {
    // State to store the current text value for which the QR code is generated.
    // Initialized with a default friendly message.
    const [qrCodeValue, setQrCodeValue] = useState("Hello World! Scan me!");

    // State to temporarily hold the input value before generating the QR code.
    const [inputValue, setInputValue] = useState("");

    // useRef to get direct access to the input DOM element.
    const inputRef = useRef();

    /**
     * Handles the QR code generation when the "Generate" button is clicked.
     * Updates the 'qrCodeValue' state with the current value from the input field.
     * Clears the input field after generation.
     */
    const handleGenerateQR = () => {
        // Get the trimmed value from the input field
        const valueToGenerate = inputRef.current.value.trim();

        // Only update QR code if the input value is not empty.
        // Otherwise, it could generate an empty QR code, or revert to a default/previous one.
        if (valueToGenerate) {
            setQrCodeValue(valueToGenerate);
        } else {
            // Optionally, set a default value or show a message if input is empty
            setQrCodeValue("Please enter some text to generate a QR code.");
        }

        inputRef.current.value = ""; // Clear the input field
        setInputValue(""); // Also clear the state tracking input for responsiveness
    };

    /**
     * Handles changes in the input field.
     * Updates the 'inputValue' state, used to control the input field's value.
     * This is good practice for controlled components in React.
     */
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    /**
     * Handles key press events, specifically for 'Enter' key.
     * Allows generating QR code by pressing Enter in the input field.
     */
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleGenerateQR();
        }
    };

    return (
        // Main container for the QR Code Generator.
        // Uses a full viewport height, a gradient background, and centers content.
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8
                    bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-800 text-white overflow-hidden">

            {/* Page Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-10 text-center
                     text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400
                     drop-shadow-lg animate-fade-in-down">
                QR Code Generator
            </h1>

            {/* Input and Button Container */}
            <div className="w-full max-w-xl flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-12 animate-fade-in-up">
                {/* Input Field */}
                <input
                    type="text"
                    ref={inputRef} // Connects the ref to the input element
                    value={inputValue} // Makes the input a controlled component
                    onChange={handleInputChange} // Updates state on change
                    onKeyPress={handleKeyPress} // Allows generating on Enter key press
                    className="flex-grow w-full sm:w-auto h-14 sm:h-16 text-lg sm:text-xl
                     rounded-full px-6 py-3
                     bg-gray-700 text-gray-100 placeholder-gray-400
                     border-2 border-transparent
                     focus:border-purple-400 focus:ring-2 focus:ring-purple-400
                     outline-none transition-all duration-300 shadow-md"
                    placeholder="Enter text or URL here..."
                />
                {/* Generate Button */}
                <button
                    onClick={handleGenerateQR}
                    className="h-14 sm:h-16 px-8 py-3
                     bg-gradient-to-r from-blue-500 to-purple-600
                     rounded-full text-white text-lg sm:text-xl font-bold
                     shadow-lg transition-all duration-300 transform
                     hover:scale-105 hover:shadow-xl active:scale-95
                     focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
                >
                    Generate
                </button>
            </div>

            {/* QR Code Display Area */}
            <div className="p-4 bg-white rounded-2xl shadow-2xl border-4 border-purple-500 animate-pop-in">
                {/*
          QRCode component from 'react-qr-code' library.
          'value': The text/URL encoded in the QR code.
          'size': The dimension of the QR code (width and height). Made it responsive for smaller screens.
          'bgColor', 'fgColor': Background and foreground colors.
          'level': Error correction level (L, M, Q, H - default is M).
        */}
                <QRCode
                    value={qrCodeValue}
                    size={256} // Default size, max for mobile responsiveness
                    bgColor="#FFFFFF" // White background for the QR code itself
                    fgColor="#000000" // Black foreground for the QR code patterns
                    level="H" // High error correction level
                    className="max-w-[250px] max-h-[250px] sm:max-w-[300px] sm:max-h-[300px] md:max-w-[350px] md:max-h-[350px]"
                    // Further ensure responsiveness of the SVG by applying max-width/height
                />
            </div>

            {/* Displaying the value encoded in the QR code */}
            <p className="mt-8 text-gray-300 text-center text-sm sm:text-base md:text-lg max-w-xl px-4 animate-fade-in delay-200">
                QR Code for: <span className="font-semibold text-teal-300 break-words">{qrCodeValue}</span>
            </p>

            {/* Custom CSS for animations. These can be moved to a global CSS file (e.g., index.css) */}
            <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }
        .animate-pop-in {
          animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
        </div>
    );
};

export default QRCodeGenerator;