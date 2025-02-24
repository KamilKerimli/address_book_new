const DarkModeToggle = () => {
    const modeStatus = localStorage.getItem("theme");
  
    if (modeStatus === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }
  
  const setupDropdown = () => {
    const dropdownButton = document.getElementById("dropdownButton");
    const settingsPanel = document.getElementById("settingsPanel");
    const closeSettingsPanel = document.getElementById("closeSettingsPanel");
  
    if (dropdownButton && settingsPanel && closeSettingsPanel) {
      dropdownButton.addEventListener("click", (event) => {
        event.preventDefault();
        settingsPanel.classList.remove("hidden");
        settingsPanel.querySelector("div").classList.remove("translate-x-full");
      });
  
      closeSettingsPanel.addEventListener("click", (event) => { closeMenu(event) });
    }
  };
  
  const closeMenu = (event) => {
    const settingsPanel = document.getElementById("settingsPanel");
    try {
      event.preventDefault();
    } catch (error) { }
    settingsPanel.classList.add("hidden");
    settingsPanel.querySelector("div").classList.add("translate-x-full");
  }
  
  const logout = () => {
    localStorage.removeItem("toke");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    window.location.reload();
  }
  
  
  export { setupDropdown, DarkModeToggle, logout, closeMenu };