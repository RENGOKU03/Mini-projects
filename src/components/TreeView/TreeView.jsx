
import MenuList from "./MenuList"; // Import the MenuList component

/**
 * TreeView component acts as the main container for the hierarchical menu.
 * It sets up the overall layout and styling for the tree structure.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} [props.menus=[]] - An array of menu items, each potentially having children.
 */
const TreeView = ({ menus = [] }) => {
    return (
        // Main container for the Tree View.
        // Uses a vibrant gradient background and centers content.
        // min-h-screen ensures it takes full viewport height for proper spacing.
        <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
            {/* Title for the Tree View component */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400 drop-shadow-lg animate-fade-in-down">
                Dynamic Tree View
            </h1>

            {/* Container for the actual menu list.
          It has a semi-transparent background, rounded corners, and shadows for visual depth.
          Responsive width (max-w-4xl) and height (h-auto min-h-[400px]) are applied.
          The 'overflow-auto' allows scrolling if the content exceeds the container height. */}
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
                      bg-gray-800 bg-opacity-70 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10
                      h-auto min-h-[400px] overflow-auto border border-gray-700
                      transform transition-transform duration-500 hover:scale-[1.01] animate-fade-in-up">
                {/* Render the MenuList component, passing the 'menus' data */}
                <MenuList list={menus} />
            </div>

            {/* Custom CSS for animations. These should ideally be in your main index.css
          or a global stylesheet for production, but are included here for demonstration. */}
            <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default TreeView;