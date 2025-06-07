import  { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
      document.documentElement.setAttribute('data-theme', value);
    }
  }, [key, value]);

  return [value, setValue];
};

const DarkMode = () => {
  const [theme, setTheme] = useLocalStorage("app-theme", "dark");

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8
                    bg-gradient-to-br from-indigo-800 to-purple-800 dark:from-gray-900 dark:to-black
                    text-white dark:text-gray-100 transition-colors duration-500 ease-in-out">

        <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl
                      text-center max-w-sm sm:max-w-md md:max-w-lg w-full
                      border border-gray-200 dark:border-gray-700
                      transform transition-all duration-500 ease-in-out animate-fade-in-up">

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8
                       text-gray-800 dark:text-white
                       animate-fade-in-down drop-shadow-sm">
            Theme Switcher
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in delay-200">
            Current Theme: <span className="font-bold capitalize">{theme}</span>
          </p>

          <button
              onClick={handleToggleTheme}
              className="px-8 py-3 rounded-full text-lg sm:text-xl font-bold
                     bg-blue-500 text-white
                     hover:bg-blue-600 active:bg-blue-700
                     dark:bg-purple-600 dark:hover:bg-purple-700 dark:active:bg-purple-800
                     shadow-lg transition-all duration-300 transform
                     hover:scale-105 active:scale-95 focus:outline-none
                     focus:ring-4 focus:ring-blue-300 dark:focus:ring-purple-400 focus:ring-opacity-75
                     animate-pop-in delay-300"
              aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === "light" ? "Activate Dark Mode" : "Activate Light Mode"}
          </button>
        </div>

        <style>{`
        :root {
          --text-color: #333;
          --bg-from: #a78bfa;
          --bg-to: #6d28d9;
        }

        .dark {
          --text-color: #f3f4f6;
          --bg-from: #1f2937;
          --bg-to: #111827;
        }

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

        .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease-out forwards; }
        .animate-pop-in { animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
      </div>
  );
};

export default DarkMode;