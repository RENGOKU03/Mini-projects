import  { useEffect, useState } from "react";
// Ensure you have react-icons installed: npm install react-icons
import { FaCircle, FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Loading from "../Loading"; // Assuming 'Loading' component path is correct

/**
 * ImageSlider component for displaying a carousel of images.
 *
 * @param {object} props - The component props.
 * @param {number} [props.limit=5] - The maximum number of images to fetch.
 * @param {string} [props.apiUrl="https://picsum.photos/v2/list"] - The base URL for fetching images.
 * @param {number} [props.page=1] - The page number for fetching images.
 */
const ImageSlider = ({ limit = 5, apiUrl = "https://picsum.photos/v2/list", page = 1 }) => {
  // State to hold the array of image data fetched from the API
  const [images, setImages] = useState([]);
  // State to track the index of the currently displayed slide
  const [currentSlide, setCurrentSlide] = useState(0);
  // State to store any error messages during API calls
  const [errorMsg, setErrorMsg] = useState(null);
  // State to indicate if data is currently being loaded
  const [loading, setLoading] = useState(false);

  /**
   * Asynchronously fetches images from the provided URL.
   *
   * @param {string} url - The complete URL to fetch images from.
   */
  async function fetchImages(url) {
    try {
      setLoading(true); // Set loading to true before fetching
      setErrorMsg(null); // Clear any previous error messages

      // Construct the full URL using the page and limit props
      const response = await fetch(`${url}?page=${page}&limit=${limit}`);

      // Check if the network response was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Parse the JSON response

      // If data is successfully fetched and not empty, update the state
      if (data && data.length) {
        setImages(data);
        setLoading(false); // Set loading to false after successful fetch
      } else {
        // If no data is returned, set an appropriate error message
        setErrorMsg("No images found.");
        setLoading(false);
      }
    } catch (error) {
      // Catch any errors during the fetch operation and update error state
      console.error("Error fetching images:", error);
      setErrorMsg(`Failed to load images: ${error.message}`);
      setLoading(false);
    }
  }

  // useEffect hook to trigger image fetching when the component mounts or apiUrl/limit/page change
  useEffect(() => {
    // Only fetch if apiUrl is not empty (though it has a default, good for dynamic changes)
    if (apiUrl) {
      fetchImages(apiUrl);
    }
  }, [apiUrl, limit, page]); // Dependencies: re-run if apiUrl, limit, or page props change

  /**
   * Handles click for the previous slide button.
   * Cycles to the last image if currently on the first, otherwise goes to the previous.
   */
  function handlePreviousClick() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  /**
   * Handles click for the next slide button.
   * Cycles to the first image if currently on the last, otherwise goes to the next.
   */
  function handleNextClick() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  // Render a loading spinner while images are being fetched
  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <Loading />
        </div>
    );
  }

  // Render an error message if an error occurred during fetch
  if (errorMsg) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-red-900 text-white p-4">
          <div className="bg-red-700 p-8 rounded-lg shadow-xl text-center">
            <h1 className="text-3xl font-bold mb-4">Error!</h1>
            <p className="text-lg">{errorMsg}</p>
          </div>
        </div>
    );
  }

  return (
      // Main container for the image slider
      // Sets full screen height, uses flexbox for centering, and a dark gradient background
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
        {/* Slider content wrapper with responsive width, aspect ratio, and styling */}
        <div className="relative w-full max-w-xl md:max-w-2xl lg:max-w-3xl aspect-video rounded-2xl shadow-2xl overflow-hidden bg-gray-800 border border-gray-700">
          {/* Slider Title */}
          <h1 className="absolute top-4 left-0 right-0 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 drop-shadow-lg p-2">
            Image Slider
          </h1>

          {/* Conditional rendering of images once loaded */}
          {images && images.length > 0 ? (
              images.map((imageItem, index) => (
                  <img
                      key={imageItem.id} // Use unique image ID as key for better performance
                      className={`
                absolute inset-0 w-full h-full object-cover rounded-2xl
                transition-opacity duration-700 ease-in-out // Smooth fade transition
                ${currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"} // Show/hide current slide
              `}
                      src={imageItem.download_url}
                      alt={`Slide ${index + 1} by ${imageItem.author}`}
                      // Fallback for broken image URLs
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop if fallback fails
                        e.target.src = `https://placehold.co/1200x800/374151/FFFFFF?text=Image+Not+Found`; // Placeholder image
                      }}
                  />
              ))
          ) : (
              // Message displayed if no images are available after loading
              <div className="flex items-center justify-center w-full h-full text-gray-400 text-xl">
                No images to display.
              </div>
          )}

          {/* Navigation Arrows */}
          <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={handlePreviousClick}
              aria-label="Previous image" // Accessibility
          >
            <FaArrowAltCircleLeft size={"35px"} className="text-white" />
          </button>

          <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={handleNextClick}
              aria-label="Next image" // Accessibility
          >
            <FaArrowAltCircleRight size={"35px"} className="text-white" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {images && images.length > 0
                ? images.map((_, index) => (
                    <button
                        key={index} // Index is fine as key for static list of dots
                        onClick={() => setCurrentSlide(index)}
                        className="p-1 focus:outline-none transition-transform duration-200 hover:scale-125"
                        aria-label={`Go to slide ${index + 1}`} // Accessibility
                    >
                      <FaCircle
                          size={"18px"} // Adjusted size for dots
                          className={`
                      ${currentSlide === index ? "text-blue-400" : "text-gray-500"} // Active/inactive color
                      transition-colors duration-200 // Smooth color change
                      ${currentSlide === index ? "scale-125" : ""} // Scale active dot
                    `}
                      />
                    </button>
                ))
                : null}
          </div>
        </div>
      </div>
  );
};

export default ImageSlider;