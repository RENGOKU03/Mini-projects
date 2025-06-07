import  { useEffect, useState } from "react";
import Loading from "../Loading"; // Assuming 'Loading' component path is correct
import UserSuggestions from "./Suggestion"; // Renamed for clarity

/**
 * UserSearchAutocomplete component fetches a list of users and provides
 * an auto-complete search functionality based on their first names.
 */
const UserSearchAutocomplete = () => {
  // State for the text currently in the search input field
  const [searchText, setSearchText] = useState("");
  // State to manage the loading status of the API call
  const [loading, setLoading] = useState(false);
  // State to store any error messages from the API call
  const [error, setError] = useState(null);
  // State to store the full list of user first names fetched from the API
  const [users, setUsers] = useState([]);
  // State to control the visibility of the suggestion dropdown
  const [showDropDown, setShowDropDown] = useState(false);
  // State to store the names filtered based on the search input
  const [filteredData, setFilteredData] = useState([]);

  /**
   * Handles changes in the search input field.
   * Filters user names based on the input query and manages dropdown visibility.
   * @param {object} event - The change event object from the input.
   */
  function handleInput(event) {
    const query = event.target.value.toLowerCase(); // Get input value and convert to lowercase for case-insensitive search
    setSearchText(query); // Update the search text state

    if (query.length > 0) { // Show dropdown if query has at least one character
      // Filter users whose first name includes the query string
      const currentFilteredData =
          users && users.length
              ? users.filter((item) => item.toLowerCase().includes(query)) // Changed to .includes for broader matching
              : [];
      setFilteredData(currentFilteredData); // Update filtered data
      setShowDropDown(true); // Show the dropdown
    } else {
      setShowDropDown(false); // Hide dropdown if query is too short or empty
      setFilteredData([]); // Clear filtered data
    }
  }

  /**
   * Handles click on a suggestion item in the dropdown.
   * Sets the search input text to the clicked suggestion and hides the dropdown.
   * @param {string} clickedItem - The text of the clicked suggestion.
   */
  function handleClick(clickedItem) { // <--- FIXED: Now correctly accepts the string
    setShowDropDown(false); // Hide dropdown
    setSearchText(clickedItem); // <--- FIXED: Use the passed string directly
    setFilteredData([]); // Clear filtered data
  }

  /**
   * Asynchronously fetches user data from the dummyjson API.
   */
  async function fetchUserData() {
    try {
      setLoading(true); // Set loading to true
      setError(null); // Clear previous errors

      const response = await fetch("https://dummyjson.com/users");
      // Check if the response was successful before parsing JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // If data is valid and contains users, update state
      if (data && data.users && data.users.length) {
        // Map to get only first names for the search functionality
        setUsers(data.users.map((userItem) => userItem.firstName));
        setLoading(false); // Set loading to false
      } else {
        setError("No user data found."); // Set error if no users are returned
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error); // Log error for debugging
      setError(`Failed to fetch users: ${error.message}`); // Set user-friendly error message
      setLoading(false);
    }
  }

  // useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []); // Empty dependency array means this runs once on mount

  return (
      // Main container for the search component.
      // Uses a full viewport height, a vibrant gradient background, and centers content.
      <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-6 md:p-8
                    bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white overflow-hidden">

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-10 text-center
                     text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400
                     drop-shadow-lg animate-fade-in-down">
          Search Auto-Complete
        </h1>

        {/* Conditional rendering for loading state */}
        {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loading />
              <p className="ml-4 text-lg text-gray-300 animate-fade-in delay-200">Loading user list...</p>
            </div>
        ) : error ? ( // Conditional rendering for error state
            <div className="bg-red-700 p-6 rounded-lg shadow-lg text-white text-center text-xl max-w-md w-full animate-fade-in">
              Error: {error}
            </div>
        ) : (
            // Search input and suggestion dropdown container
            <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl animate-fade-in-up">
              <input
                  type="text"
                  value={searchText} // Input value controlled by state
                  className="w-full px-5 py-3 sm:px-6 sm:py-4 text-lg sm:text-xl font-semibold
                       bg-gray-700 text-gray-100 placeholder-gray-400 rounded-full
                       border-2 border-transparent focus:border-purple-400 focus:ring-2 focus:ring-purple-400
                       outline-none transition-all duration-300 shadow-md"
                  placeholder="Search user names..."
                  onChange={handleInput} // Call handleInput on change
                  aria-label="Search user names" // Accessibility
              />
              {/* Conditionally render suggestions based on showDropDown state */}
              {showDropDown && filteredData.length > 0 && (
                  <UserSuggestions data={filteredData} handleClick={handleClick} />
              )}
              {/* Message if dropdown is active but no results found */}
              {showDropDown && filteredData.length === 0 && searchText.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-700 rounded-lg shadow-lg py-3 px-4 text-gray-300 text-center text-base sm:text-lg border border-gray-600">
                    No matching names found.
                  </div>
              )}
            </div>
        )}

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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
      </div>
  );
};

export default UserSearchAutocomplete;