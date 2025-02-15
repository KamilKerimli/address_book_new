const DarkModeToggle = () => {
    const modeStatus = localStorage.getItem("theme");

    console.log("Mode: " + modeStatus);

    if(modeStatus == "light"){
        document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
    }
    else{
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

        closeSettingsPanel.addEventListener("click", (event) => {
            event.preventDefault();
            settingsPanel.classList.add("hidden");
            settingsPanel.querySelector("div").classList.add("translate-x-full");
        });
    }
};

export { setupDropdown, DarkModeToggle };