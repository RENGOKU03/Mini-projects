import React from "react";
import useLocalStorage from "./useLocalStorage";
import "./dark.css";

const DarkMode = () => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");
  function handelToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  return (
    <div className="main-div" theme-selected={theme}>
      <div className="container">
        <h1>Dark Mode</h1>
        <button onClick={() => handelToggleTheme()}>
          {theme === "light" ? "Toggle Dark Mode" : "Toggle Light Mode"}
        </button>
      </div>
    </div>
  );
};

export default DarkMode;
