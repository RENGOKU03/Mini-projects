// Profile.jsx
import  { useEffect, useRef, useState } from "react";
import Card from "./Card"; // Component to display user data
import Loading from "../Loading"; // Assuming 'Loading' component path is correct

/**
 * Profile component fetches and displays GitHub user profiles.
 * It provides a search input to find a GitHub user and renders their details using the Card component.
 */
const Profile = () => {
  // State to store the fetched GitHub user data
  const [userData, setUserData] = useState(null);
  // State to manage the loading status during API calls
  const [loading, setLoading] = useState(false);
  // State to store the username that is being searched.
  // It's intentionally separated from inputRef to trigger useEffect on change.
  const [userNameToSearch, setUserNameToSearch] = useState("");
  // State to handle any error messages from the API call
  const [errorMsg, setErrorMsg] = useState(null);

  // useRef to get direct access to the input DOM element for getting its value
  const inputRef = useRef("");

  /**
   * Handles the search button click or Enter key press.
   * Sets the 'userNameToSearch' state with the current value from the input field,
   * which then triggers the useEffect to fetch data. Clears the input field.
   */
  const handleOnSearch = () => {
    const inputValue = inputRef.current.value.trim(); // Get trimmed input value
    if (inputValue) {
      setUserNameToSearch(inputValue); // Trigger data fetch
      setErrorMsg(null); // Clear any previous error messages
    } else {
      setUserData(null); // Clear previous user data if input is empty
      setErrorMsg("Please enter a GitHub username.");
    }
    inputRef.current.value = ""; // Clear the input field after triggering search
  };

  /**
   * Handles key press events in the input field.
   * Triggers the search function if the 'Enter' key is pressed.
   * @param {KeyboardEvent} event - The keyboard event object.
   */
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleOnSearch();
    }
  };

  /**
   * Asynchronously fetches GitHub user data from the API.
   * Uses the 'userNameToSearch' state to build the API URL.
   */
  async function fetchData() {
    setLoading(true); // Set loading to true while fetching
    setUserData(null); // Clear previous user data
    setErrorMsg(null); // Clear previous error

    try {
      const res = await fetch(`https://api.github.com/users/${userNameToSearch}`);
      const data = await res.json();

      if (res.ok) { // Check if the response status is successful (e.g., 200 OK)
        setUserData(data); // Set fetched user data
        setLoading(false); // Set loading to false
      } else {
        // Handle API errors (e.g., 404 Not Found for non-existent user)
        setErrorMsg(data.message || "User not found or API error.");
        setLoading(false);
        setUserData(null); // Ensure user data is null on error
      }
    } catch (error) {
      console.error("Error fetching GitHub profile:", error);
      setErrorMsg("Network error or failed to fetch profile. Please try again.");
      setLoading(false);
      setUserData(null); // Ensure user data is null on error
    }
  }

  // useEffect hook to trigger data fetching whenever 'userNameToSearch' changes
  useEffect(() => {
    if (userNameToSearch) { // Only fetch if a username is provided
      fetchData();
    }
  }, [userNameToSearch]); // Dependency array: re-run fetchData when userNameToSearch changes

  // Render a loading spinner if data is currently being fetched
  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
          <Loading />
        </div>
    );
  }

  return (
      // Main container for the GitHub Profile Viewer.
      // Uses a full viewport height, a vibrant gradient background, and centers content.
      <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-6 md:p-8
                    bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-800 text-white overflow-hidden">

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-10 text-center
                     text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400
                     drop-shadow-lg animate-fade-in-down">
          GitHub Profile Viewer
        </h1>

        {/* Search Input and Button Container */}
        <div className="w-full max-w-xl flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-12 animate-fade-in-up">
          <input
              type="text"
              className="flex-grow w-full sm:w-auto h-14 sm:h-16 text-lg sm:text-xl
                     rounded-full px-6 py-3
                     bg-gray-700 text-gray-100 placeholder-gray-400
                     border-2 border-transparent
                     focus:border-purple-400 focus:ring-2 focus:ring-purple-400
                     outline-none transition-all duration-300 shadow-md"
              placeholder="Enter GitHub username..."
              ref={inputRef} // Connects the ref to the input element
              onKeyPress={handleKeyPress} // Allows search on Enter key
          />
          <button
              onClick={handleOnSearch}
              className="h-14 sm:h-16 px-8 py-3
                     bg-gradient-to-r from-blue-500 to-purple-600
                     rounded-full text-white text-lg sm:text-xl font-bold
                     shadow-lg transition-all duration-300 transform
                     hover:scale-105 hover:shadow-xl active:scale-95
                     focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
          >
            Search
          </button>
        </div>

        {/* Conditional rendering based on fetch results */}
        {errorMsg && (
            <div className="bg-red-700 p-4 sm:p-6 rounded-lg shadow-lg text-white text-center text-lg sm:text-xl max-w-md w-full animate-fade-in mb-8">
              {errorMsg}
            </div>
        )}

        {/* Render the Card component if userData is available, otherwise show a welcome message */}
        {userData ? (
            <Card userData={userData} />
        ) : !loading && !errorMsg && (
            <div className="bg-gray-800 bg-opacity-70 p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-fade-in-up">
              <p className="text-xl sm:text-2xl text-gray-300 font-semibold mb-4">
                Start by searching for a GitHub user!
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                (e.g., "octocat", "torvalds", "kentcdodds")
              </p>
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
      `}</style>
      </div>
  );
};

export default Profile;