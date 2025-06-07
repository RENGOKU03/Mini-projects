

/**
 * UserSuggestions component displays a list of filtered user name suggestions.
 * It's designed to be used as a dropdown for auto-complete functionality.
 *
 * @param {object} props - Component props.
 * @param {Array<string>} [props.data=[]] - An array of user names to display as suggestions.
 * @param {function} props.handleClick - Function to call when a suggestion is clicked.
 */
const UserSuggestions = ({ data = [], handleClick }) => {
    return (
        // Main container for the suggestions dropdown.
        // 'absolute top-full left-0 right-0': positions it directly below the input.
        // 'mt-2': provides a small margin from the input.
        // 'bg-gray-800 bg-opacity-90': semi-transparent dark background.
        // 'rounded-lg shadow-xl': rounded corners and strong shadow.
        // 'max-h-60 overflow-y-auto': limits height and adds scrollbar if needed.
        // 'border border-gray-700': subtle border.
        // 'animate-fade-in': provides a smooth appearance.
        <ul className="absolute top-full left-0 right-0 mt-2
                   bg-gray-800 bg-opacity-95 rounded-lg shadow-xl
                   max-h-60 overflow-y-auto border border-gray-700
                   animate-fade-in z-10">
            {data.length ? ( // Check if there's any data to display
                data.map((item, index) => (
                    // Individual suggestion item.
                    // 'py-3 px-4': comfortable padding.
                    // 'text-lg sm:text-xl': responsive font size.
                    // 'hover:bg-purple-700': hover effect.
                    // 'cursor-pointer': indicates interactivity.
                    // 'transition-colors duration-200': smooth hover transition.
                    <li
                        key={index} // Using index as key is acceptable here since the list is filtered but essentially static for unique names.
                        onClick={() => handleClick(item)} // Call handleClick with the item's text
                        className="py-3 px-4 text-gray-200 text-base sm:text-lg
                       hover:bg-blue-600 hover:text-white
                       cursor-pointer transition-colors duration-200 ease-in-out"
                    >
                        {item}
                    </li>
                ))
            ) : (
                // Message displayed if no suggestions are found after filtering
                <li className="py-3 px-4 text-gray-400 text-center text-base sm:text-lg">
                    No matches found.
                </li>
            )}
        </ul>
    );
};

export default UserSuggestions;