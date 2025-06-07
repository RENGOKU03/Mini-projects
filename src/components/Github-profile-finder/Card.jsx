

/**
 * Card component displays the detailed profile information for a GitHub user.
 *
 * @param {object} props - The component props.
 * @param {object} props.userData - An object containing GitHub user data (e.g., avatar_url, name, login, bio, followers, following, public_repos, html_url).
 */
const Card = ({ userData }) => {
  return (
      // Main card container.
      // Responsive width, elegant background, rounded corners, and shadow for depth.
      // animate-fade-in ensures a smooth appearance when user data is loaded.
      <div className="bg-gray-800 bg-opacity-70 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10
                    max-w-md w-full text-center border border-gray-700
                    transform transition-all duration-500 animate-fade-in-up">

        {/* Avatar Image */}
        <img
            src={userData.avatar_url} // GitHub user's avatar URL
            alt={`${userData.login}'s avatar`} // Alt text for accessibility
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-6 border-4 border-blue-400
                   shadow-lg transition-transform duration-300 hover:scale-105"
            // Fallback for broken image links
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/160x160/374151/FFFFFF?text=No+Avatar`;
            }}
        />

        {/* User Name and Login */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-400">
          {userData.name || userData.login} {/* Display full name or login if name is null */}
        </h2>
        <p className="text-gray-400 text-lg sm:text-xl font-medium mb-4">
          @{userData.login} {/* Display username */}
        </p>

        {/* User Bio (conditional rendering if available) */}
        {userData.bio && (
            <p className="text-gray-300 text-base sm:text-lg mb-6 italic leading-relaxed">
              "{userData.bio}"
            </p>
        )}

        {/* Stats Section */}
        <div className="flex justify-around items-center flex-wrap gap-4 mb-6">
          <div className="flex flex-col items-center p-3 bg-gray-700 bg-opacity-50 rounded-lg">
            <span className="text-xl sm:text-2xl font-bold text-blue-300">{userData.followers}</span>
            <span className="text-sm sm:text-base text-gray-400">Followers</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-700 bg-opacity-50 rounded-lg">
            <span className="text-xl sm:text-2xl font-bold text-pink-300">{userData.following}</span>
            <span className="text-sm sm:text-base text-gray-400">Following</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-700 bg-opacity-50 rounded-lg">
            <span className="text-xl sm:text-2xl font-bold text-green-300">{userData.public_repos}</span>
            <span className="text-sm sm:text-base text-gray-400">Repositories</span>
          </div>
        </div>

        {/* Link to GitHub Profile */}
        <a
            href={userData.html_url}
            target="_blank" // Opens link in a new tab
            rel="noopener noreferrer" // Security best practice for target="_blank"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700
                   rounded-full text-white text-base sm:text-lg font-bold
                   shadow-md transition-all duration-300 transform
                   hover:scale-105 hover:shadow-xl active:scale-95
                   focus:outline-none focus:ring-4 focus:ring-blue-400"
        >
          View GitHub Profile
        </a>
      </div>
  );
};

export default Card;