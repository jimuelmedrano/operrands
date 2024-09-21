import {
  LightModeOutlined,
  DarkModeOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
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
    console.log(localStorage.getItem("theme"));
  };

  return (
    <div className="flex-between w-full py-8">
      <a href="/" className="font-koulen text-3xl">
        <span className="text-black dark:text-white">OP</span>
        <span className="text-primary dark:text-primaryDark">ERRANDS</span>
      </a>
      <div className="flex-between w-20">
        <button onClick={toggleDarkMode}>
          {darkMode ? (
            <DarkModeOutlined
              className="dark:text-white"
              sx={{ fontSize: 30 }}
            />
          ) : (
            <LightModeOutlined
              className="dark:text-white"
              sx={{ fontSize: 30 }}
            />
          )}
        </button>

        <NotificationsOutlined
          className="dark:text-white"
          sx={{ fontSize: 30 }}
        />
      </div>
    </div>
  );
};

export default TopBar;
