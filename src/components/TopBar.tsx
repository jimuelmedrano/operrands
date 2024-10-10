import Icon from "./Icon";
import { useState } from "react";

const TopBar = () => {
  const currentTheme = localStorage.getItem("theme") === "dark";
  const [darkMode, setDarkMode] = useState(currentTheme);
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="fixed top-0 left-0 z-50 bg-background flex-between w-full px-4 md:px-8 py-5 mb-5">
      <a href="/" className="text-2xl">
        <span className="text-foreground">OP</span>
        <span className="text-primary">ERRANDS</span>
      </a>
      <div className="flex-between">
        <button
          onClick={toggleDarkMode}
          className={
            "mr-6 transition-transform duration-1000 " +
            (darkMode ? "rotate-0" : "rotate-180")
          }
        >
          {darkMode ? (
            <Icon name="Moon" className="text-foreground" />
          ) : (
            <Icon name="Sun" className="text-foreground" />
          )}
        </button>

        <Icon name="Bell" className="text-foreground" />
      </div>
    </div>
  );
};

export default TopBar;
