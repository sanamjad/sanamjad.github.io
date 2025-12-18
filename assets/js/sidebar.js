// assets/js/sidebar.js

function initSidebar(mode, siteData) {
  const { profile, contact, profiles } = siteData;
  const sidebar = document.getElementById("sidebar");

  // Basic skeleton: NAV at the top, then header, chips, etc.
sidebar.innerHTML = `
  <div class="sidebar-top">
    <nav class="nav" id="nav" aria-label="Sidebar navigation"></nav>
    <button id="themeToggle" class="theme-toggle" type="button">
      <span id="themeIcon">🌙</span>
    </button>
  </div>

  <header class="sidebar-header">
    <!-- Name above -->
    <div class="name" id="name"></div>

    <!-- Photo + title/location in a row -->
    <div class="sidebar-header-row">
      <div class="avatar">
        <span id="avatarInitials"></span>
      </div>
      <div class="sidebar-text">
        <div class="title" id="title"></div>
        <div class="location" id="location"></div>
      </div>
    </div>
  </header>

  <div class="chip-row" id="keywords"></div>

  <section class="sidebar-section">
    <h3>Contact</h3>
    <ul id="contactList"></ul>
  </section>

  <section class="sidebar-section">
    <h3>Profiles &amp; CV</h3>
    <ul id="profilesList"></ul>
  </section>

   <footer class="sidebar-footer">
    © 2025 
    <a href="https://www.linkedin.com/in/shahidabbas76/" target="_blank" class="footer-link">
      Shahid Abbas
    </a>. 
    All rights reserved.
  </footer>
`;


  // Avatar: photo if available, otherwise initials
  const avatarEl = sidebar.querySelector(".avatar");
  const initialsEl = sidebar.querySelector("#avatarInitials");

  if (profile.photoUrl) {
    const img = document.createElement("img");
    img.src = profile.photoUrl;
    img.alt = profile.name;
    avatarEl.innerHTML = "";
    avatarEl.appendChild(img);
  } else {
    initialsEl.textContent = profile.initials;
  }

  // Basic text
  document.getElementById("name").textContent = profile.name;
  document.getElementById("title").textContent = profile.title;
  document.getElementById("location").textContent = profile.location;

  // Keywords
  const keywordsContainer = document.getElementById("keywords");
  profile.keywords.forEach((kw) => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = kw;
    keywordsContainer.appendChild(chip);
  });

  // Contact
const contactList = document.getElementById("contactList");

contact.forEach((item) => {
  const li = document.createElement("li");
  li.classList.add("contact-item");

 li.innerHTML = `
  <i class="${item.icon} contact-icon"></i>
  <div class="contact-text">${item.html}</div>
`;


  contactList.appendChild(li);
});


  // Profiles
    const profilesList = document.getElementById("profilesList");
    profilesList.classList.add("profiles-grid");

    profiles.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <a href="${item.url}" target="_blank" class="profile-icon-link">
        <i class="${item.icon} profile-icon"></i>
        <span>${item.name}</span>
        </a>
    `;
    profilesList.appendChild(li);
    });
  // NAV content depends on page
  const nav = document.getElementById("nav");

  if (mode === "home") {
    // Leave nav empty; main.js will fill section buttons (About, Research, etc.)
  }

  // If HOME → leave nav empty (main.js will fill section buttons)
    if (mode !== "home") {
    // Convert "publications" → "Publications", "grants" → "Grants", etc.
    const label = mode.charAt(0).toUpperCase() + mode.slice(1);

    nav.innerHTML = `
        <a href="./"><button type="button">Home</button></a>
        <button type="button" class="active">${label}</button>
    `;
    }


}
