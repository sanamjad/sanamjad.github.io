// assets/js/publications.js

document.addEventListener("DOMContentLoaded", () => {
  initSidebar("publications", siteData);
  renderPublications();
  setupThemeToggle();
});

function renderPublications() {
  const container = document.getElementById("pubsSection");
  if (!container || !Array.isArray(pubData)) return;

  container.innerHTML = ""; // clear

  // Newest year first
  const sorted = [...pubData].sort((a, b) => b.year - a.year);

  sorted.forEach((yearBlock) => {
    // Year heading
    const yearHeading = document.createElement("h3");
    yearHeading.className = "pub-year";
    yearHeading.textContent = yearBlock.year;
    container.appendChild(yearHeading);

    // List for that year
    const list = document.createElement("ul");
    list.className = "pub-list";

    (yearBlock.items || []).forEach((pub) => {
      const li = document.createElement("li");
      li.className = "pub-item";

      // Citation text
      const citationDiv = document.createElement("div");
      citationDiv.className = "pub-citation";
      citationDiv.textContent = pub.citation || "";
      li.appendChild(citationDiv);

      // Tags row (e.g. Selected)
      const metaDiv = document.createElement("div");
      metaDiv.className = "pub-meta small";
      if (pub.tags && pub.tags.includes("Selected")) {
        metaDiv.innerHTML = `<span class="badge">Selected</span>`;
      }
      li.appendChild(metaDiv);

      // Links row
      const links = [];
      if (pub.pubUrl) {
        links.push(
          `<a href="${pub.pubUrl}" target="_blank" rel="noreferrer">📄 Publisher</a>`
        );
      }
      if (pub.pdfUrl) {
        links.push(
          `<a href="${pub.pdfUrl}" target="_blank" rel="noreferrer">PDF</a>`
        );
      }
      if (pub.codeUrl) {
        links.push(
          `<a href="${pub.codeUrl}" target="_blank" rel="noreferrer">💻 Code</a>`
        );
      }

      if (links.length > 0) {
        const linkDiv = document.createElement("div");
        linkDiv.className = "small pub-links";
        linkDiv.innerHTML = links.join(" · ");
        li.appendChild(linkDiv);
      }

      list.appendChild(li);
    });

    container.appendChild(list);
  });
}

/* Theme toggle (same behaviour as main page, inc. system preference) */
function setupThemeToggle() {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  if (!themeToggle || !themeIcon) return;

  // 1) Check if user already chose something
  const storedTheme = localStorage.getItem("theme");

  let isDark;
  if (storedTheme === "dark") {
    isDark = true;
  } else if (storedTheme === "light") {
    isDark = false;
  } else {
    // 2) No stored preference → use system preference
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    isDark = prefersDark;
  }

  // Apply initial theme
  if (isDark) {
    body.classList.add("dark");
    themeIcon.textContent = "☀️"; // dark now, click to go light
  } else {
    body.classList.remove("dark");
    themeIcon.textContent = "🌙"; // light now, click to go dark
  }

  // 3) Let user toggle + store preference
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const nowDark = body.classList.contains("dark");
    themeIcon.textContent = nowDark ? "☀️" : "🌙";
    localStorage.setItem("theme", nowDark ? "dark" : "light");
  });
}
