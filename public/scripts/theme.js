window.onload = () => {
  document.body.classList.remove("preload");
};

const getTheme = localStorage.getItem("theme");
if (getTheme === "dark") {
  document.documentElement.classList.add("dark");
}
