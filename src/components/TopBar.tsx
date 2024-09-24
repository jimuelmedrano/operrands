import { Sun, Moon, Bell } from "lucide-react";

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
    <div className="flex-between w-full py-5">
      <a href="/" className="text-2xl">
        <span className="font-koulen ">OP</span>
        <span className="font-koulen text-primary dark:text-primaryDark">
          ERRANDS
        </span>
      </a>
      <div className="flex-between">
        <button onClick={toggleDarkMode} className="mr-6">
          {darkMode ? (
            <Moon className="icon-style" />
          ) : (
            <Sun className="icon-style" />
          )}
        </button>

        <Bell className="icon-style" />
      </div>
    </div>
  );
};

export default TopBar;
