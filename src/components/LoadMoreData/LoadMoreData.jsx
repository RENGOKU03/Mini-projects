import  { useEffect, useRef, useState } from "react";
import Loading from "../Loading"; // Assuming 'Loading' component path is correct

const LoadMoreData = () => {
  const [loading, setLoading] = useState(false); // Manages loading state for API calls
  const [products, setProducts] = useState([]); // Stores fetched product data
  const [count, setCount] = useState(0); // Tracks current page/batch for pagination
  const [disableButton, setDisableButton] = useState(false); // Controls Load More button's disabled state
  const [totalProductsAvailable, setTotalProductsAvailable] = useState(0); // Stores total products from API for pagination logic

  const titleRef = useRef(); // Refers to the title element for smooth scrolling

  /**
   * Handles "Load More" button click. Increments page count and scrolls to the top.
   */
  function handleLoadMoreButton() {
    titleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCount((prevCount) => prevCount + 1); // Fetch next set of products
  }

  /**
   * Fetches product data from the dummyjson API based on the current 'count'.
   */
  async function fetchData() {
    try {
      setLoading(true);
      // Fetches 10 products, skipping based on the current 'count' (page number)
      const response = await fetch(
          `https://dummyjson.com/products?limit=10&skip=${count * 10}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]); // Append new products
        setTotalProductsAvailable(result.total); // Update total available products
        setLoading(false);
      } else {
        setDisableButton(true); // Disable button if no more products are returned
        setLoading(false);
      }
    } catch (e) {
      console.error("Failed to fetch data:", e);
      setLoading(false);
      // Consider displaying a user-friendly error message in the UI here
    }
  }

  // Effect to fetch data whenever the 'count' (page number) changes
  useEffect(() => {
    fetchData();
  }, [count]);

  // Effect to determine if the "Load More" button should be disabled
  // based on fetched products vs. total available products.
  useEffect(() => {
    if (products.length >= totalProductsAvailable && totalProductsAvailable > 0) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [products, totalProductsAvailable]);

  // Renders a full loading screen for initial data fetch,
  // or a smaller loading indicator for subsequent fetches.
  if (loading && products.length === 0) {
    return <Loading />;
  }
  if (loading && products.length > 0) {
    return (
        <div className="flex justify-center items-center h-20 text-gray-300 text-lg">
          <Loading /> <span className="ml-2">Loading more products...</span>
        </div>
    );
  }

  return (
      // Main container with responsive padding and a gradient background
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col items-center p-4 sm:p-6 md:p-8">
        <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 animate-fade-in-down drop-shadow-lg"
            ref={titleRef}
        >
          Explore Our Products
        </h1>

        {/* Responsive grid for product display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-7 md:gap-8 w-full max-w-7xl mx-auto mb-12">
          {products && products.length > 0 ? (
              products.map((item) => (
                  <div
                      key={item.id}
                      className="bg-gray-800 bg-opacity-70 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700 flex flex-col animate-fade-in-up"
                  >
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-2xl border-b border-gray-700"
                        // Fallback for broken image links
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/400x300/374151/FFFFFF?text=Image+Not+Found`;
                        }}
                    />
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <p className="text-lg sm:text-xl font-semibold text-gray-200 mb-2 truncate">
                        {item.title}
                      </p>
                      <p className="text-md text-gray-400">
                        ${item.price}
                      </p>
                    </div>
                  </div>
              ))
          ) : (
              <div className="col-span-full text-center text-xl text-gray-400">
                No products found.
              </div>
          )}
        </div>

        {/* Load More Button */}
        <div className="pb-8 w-full flex justify-center">
          <button
              disabled={disableButton}
              onClick={handleLoadMoreButton}
              className={`
            text-lg sm:text-xl md:text-2xl font-bold tracking-wide 
            px-8 py-3 rounded-full shadow-lg 
            transition-all duration-300 transform 
            ${disableButton
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed" // Disabled state styling
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 active:scale-95 text-white" // Enabled state styling
              }
            min-w-[250px] sm:min-w-[300px] md:min-w-[400px]
            focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-75
            animate-pop-in
          `}
          >
            {disableButton ? "All Products Loaded!" : "Load More Products"}
          </button>
        </div>

        {/* Custom CSS for animations (can be moved to a global stylesheet) */}
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
        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }
        .animate-pop-in {
          animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
        }
      `}</style>
      </div>
  );
};

export default LoadMoreData;