import  { useState } from "react";
// Ensure you have react-icons installed: npm install react-icons
import { FaStar } from "react-icons/fa6";

// StarRating component for a customizable star rating system
// It takes a 'totalStars' prop to determine the number of stars to display,
// defaulting to 5 if not provided.
const StarRating = ({ totalStars = 5 }) => {
  // State to store the current selected rating (how many stars are permanently filled)
  const [rating, setRating] = useState(0);

  // State to store the rating value when hovering over stars.
  // This creates the interactive hover effect before a permanent selection.
  const [hover, setHover] = useState(0);

  /**
   * Handles the click event on a star.
   * Sets the permanent 'rating' state to the index of the clicked star.
   * @param {number} currentIndex - The 1-based index of the star that was clicked.
   */
  const handleClick = (currentIndex) => {
    setRating(currentIndex);
  };

  /**
   * Handles the mouse move event over a star.
   * Updates the 'hover' state to the index of the star currently being hovered over.
   * This provides immediate visual feedback during hovering.
   * @param {number} currentIndex - The 1-based index of the star being hovered.
   */
  const handleMouseMove = (currentIndex) => {
    setHover(currentIndex);
  };

  /**
   * Handles the mouse leave event from the star container.
   * Reverts the 'hover' state back to the current 'rating' state.
   * This ensures that when the mouse leaves, stars reflect the actual selected rating.
   */
  const handleMouseLeave = () => {
    setHover(rating); // After leaving, show the actual selected rating
  };

  return (
      // Main container for the star rating system
      // Features a dynamic gradient background, centers content, and provides responsive padding
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-black text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 snap-start">
        {/* Inner content container for styling and visual appeal */}
        <div className="bg-gray-800 bg-opacity-70 rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 lg:p-16 max-w-xl w-full text-center border border-gray-700 transform transition-transform duration-500 ease-out animate-fade-in-up">
          {/* Title of the component */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 tracking-wide drop-shadow-lg">
            Rate Our Service!
          </h1>

          {/* Container for the star icons */}
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
            {/* Map over an array to render individual stars */}
            {[...Array(totalStars)].map((_, index) => {
              const starValue = index + 1; // Calculate the 1-based value for each star

              return (
                  <FaStar
                      key={starValue} // Unique key for each star for React's reconciliation
                      // Dynamically apply Tailwind CSS classes for size, color, and interactivity
                      className={`
                  text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl // Responsive sizing for stars
                  cursor-pointer
                  transition-all duration-200 ease-in-out // Smooth transitions for hover/click
                  transform hover:scale-125 // Scale up on hover
                  active:scale-90 // Slightly shrink on click
                  ${starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-600"} // Conditional color based on rating/hover
                  drop-shadow-md // Subtle shadow for stars
                `}
                      onClick={() => handleClick(starValue)}
                      onMouseMove={() => handleMouseMove(starValue)}
                      onMouseLeave={handleMouseLeave}
                  />
              );
            })}
          </div>

          {/* Display the current rating if a selection has been made */}
          {rating > 0 && (
              <p className="mt-8 text-lg sm:text-xl md:text-2xl font-semibold text-gray-300 animate-fade-in delay-200">
                You rated: <span className="text-yellow-400 font-bold">{rating}</span> out of{" "}
                <span className="text-yellow-400 font-bold">{totalStars}</span> stars!
              </p>
          )}
        </div>

        {/* Custom CSS for animations. In a real project, these keyframes
          would typically be in your main index.css or a global stylesheet. */}
        <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
      </div>
  );
};

export default StarRating;