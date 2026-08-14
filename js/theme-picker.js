// Builds the floating palette picker and remembers the chosen theme.
// Remove the .theme-picker element (and this script) once a palette is picked.

const THEMES = [
  { id: "sapphire", name: "Sapphire (current)", swatch: ["#171b40", "#0F52BA", "#87CEEB"] },
  { id: "midnight-rose", name: "Midnight Rose", swatch: ["#14142b", "#2f3a8f", "#ff8fb1"] },
  { id: "bubblegum-blue", name: "Bubblegum Blue", swatch: ["#0d1b3e", "#1f4fa8", "#ff5fa2"] },
  { id: "orchid-steel", name: "Orchid Steel", swatch: ["#1b1233", "#4c5fd7", "#f0a6ca"] },
  { id: "cotton-candy", name: "Cotton Candy", swatch: ["#fdf4f8", "#3f6fd1", "#d9508b"] },
  { id: "ice-and-rose", name: "Ice & Rose", swatch: ["#eef4fb", "#16233f", "#e26d94"] }
];

const STORAGE_KEY = "preferred-theme";

function applyTheme(id) {
  document.documentElement.setAttribute("data-theme", id);
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch (e) {
    // storage unavailable (private browsing) -- theme still applies for this visit
  }
  document.querySelectorAll(".theme-picker button").forEach(function (button) {
    button.setAttribute("aria-pressed", String(button.dataset.theme === id));
  });
}

function buildPicker() {
  const picker = document.querySelector(".theme-picker");
  if (!picker) return;

  const label = document.createElement("p");
  label.textContent = "Color scheme";
  picker.appendChild(label);

  THEMES.forEach(function (theme) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.theme = theme.id;
    button.setAttribute("aria-pressed", "false");

    const swatch = document.createElement("span");
    swatch.className = "swatch";
    theme.swatch.forEach(function (color) {
      const chip = document.createElement("span");
      chip.style.background = color;
      swatch.appendChild(chip);
    });

    button.appendChild(swatch);
    button.appendChild(document.createTextNode(theme.name));
    button.addEventListener("click", function () {
      applyTheme(theme.id);
    });
    picker.appendChild(button);
  });
}

function savedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  buildPicker();
  const stored = savedTheme();
  applyTheme(THEMES.some((t) => t.id === stored) ? stored : THEMES[0].id);
});
