// assets/js/main.js 

document.addEventListener("DOMContentLoaded", () => {
  initSidebar("home", siteData);
  renderNav(siteData.sections);
  renderSections(siteData.sections);
  setupThemeToggle();
  setupIntersectionObserver();
  setupLightbox(); // ✅ add this
});

/** Get selected publications from global pubData (from pubs-data.js) */
function getSelectedPubs(max = 6) {
  const data = window.pubData;
  if (!Array.isArray(data)) {
    console.warn("pubData is not an array or not loaded.");
    return [];
  }

  const selected = [];

  data.forEach((yearBlock) => {
    (yearBlock.items || []).forEach((item) => {
      // Check for "Selected" tag when there would be multiple publications we will uncomment this conditions to active another page
     // if (item.tags && item.tags.includes("Selected")) {
        selected.push({
          year: yearBlock.year,
          ...item
        });
      //}
    });
  });

  // Newest year first
  selected.sort((a, b) => b.year - a.year);

  return selected.slice(0, max);
}

function renderNav(sections) {
  const nav = document.getElementById("nav");
  nav.innerHTML = ""; // clear, just in case

  sections.forEach((sec, idx) => {
    const btn = document.createElement("button");
    btn.textContent = sec.navLabel;
    btn.dataset.target = sec.id;
    btn.type = "button";

    if (idx === 0) btn.classList.add("active");

    btn.addEventListener("click", () => {
      // Special case: Publications goes to publications.html
      if (sec.id === "publications") {
        window.location.href = "publications.html";
        return;
      }

      // All other buttons scroll to their section on the same page
      const target = document.getElementById(sec.id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    nav.appendChild(btn);
  });
}

function renderSections(sections) {
  const content = document.getElementById("content");

  sections.forEach((sec) => {
    const sectionEl = document.createElement("section");
    sectionEl.id = sec.id;
    sectionEl.className = "section";

    const header = document.createElement("div");
    header.className = "section-header";
    header.innerHTML = `
      <h2 class="section-title">${sec.title}</h2>
      <span class="section-kicker">${sec.subtitle || ""}</span>
    `;
    sectionEl.appendChild(header);

    // --- TEXT SECTIONS ---
    if (sec.type === "text") {
      sec.paragraphs.forEach((p) => {
        const para = document.createElement("p");
        para.textContent = p;
        sectionEl.appendChild(para);
      });

      if (sec.metrics && sec.metrics.length) {
        const metrics = document.createElement("div");
        metrics.className = "inline-metrics";
        sec.metrics.forEach((m) => {
          const badge = document.createElement("span");
          badge.className = "badge";
          badge.textContent = m;
          metrics.appendChild(badge);
        });
        sectionEl.appendChild(metrics);
      }

      if (sec.pills && sec.pills.length) {
        const pillRow = document.createElement("div");
        pillRow.className = "pill-row";
        sec.pills.forEach((p) => {
          const pill = document.createElement("span");
          pill.className = "pill";
          pill.textContent = p;
          pillRow.appendChild(pill);
        });
        sectionEl.appendChild(pillRow);
      }
    }

    // --- TIMELINE SECTIONS (Experience, Education, etc.) ---
    if (sec.type === "timeline") {
      const timeline = document.createElement("div");
      timeline.className = "timeline";

      sec.items.forEach((item) => {
        const itemEl = document.createElement("article");
        itemEl.className = "timeline-item";

        const itemHeader = document.createElement("div");
        itemHeader.className = "timeline-header";
        itemHeader.innerHTML = `
          <div>
            <div class="timeline-role">${item.role}</div>
            <div class="timeline-org">${item.org}</div>
          </div>
          <div class="timeline-meta">${item.meta || ""}</div>
        `;
        itemEl.appendChild(itemHeader);

        if (item.description) {
          const desc = document.createElement("p");
          desc.textContent = item.description;
          itemEl.appendChild(desc);
        }

        if (item.pills && item.pills.length) {
          const pillRow = document.createElement("div");
          pillRow.className = "pill-row";
          item.pills.forEach((p) => {
            const pill = document.createElement("span");
            pill.className = "pill";
            pill.textContent = p;
            pillRow.appendChild(pill);
          });
          itemEl.appendChild(pillRow);
        }

        timeline.appendChild(itemEl);
      });

      sectionEl.appendChild(timeline);
    }

    // --- SELECTED PUBLICATIONS (home page section) ---
    if (sec.type === "publications") {
      if (sec.intro) {
        const para = document.createElement("p");
        para.className = "small";
        // use innerHTML if intro contains links
        para.innerHTML = sec.intro;
        sectionEl.appendChild(para);
      }

      const ul = document.createElement("ul");
      ul.className = "pub-list";

      const maxItems = sec.maxItems || 6;
      const selectedPubs = getSelectedPubs(maxItems);

      if (selectedPubs.length === 0) {
        const li = document.createElement("li");
        li.innerHTML = `
          <div class="pub-title small">
            No selected publications found. Make sure <code>pubs-data.js</code> has items with <code>tags: ["Selected"]</code>.
          </div>
        `;
        ul.appendChild(li);
      } else {
        selectedPubs.forEach((pub) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="pub-title">${pub.citation}</div>
            <div class="pub-meta small">
              Year: ${pub.year}${
                pub.tags && pub.tags.includes("Selected")
                  ? ' · <span class="badge">Selected</span>'
                  : ""
              }
            </div>
          `;
          ul.appendChild(li);
        });
      }

      sectionEl.appendChild(ul);
    }

    // --- DIAGRAMS SECTION (new last section) ---
    if (sec.type === "diagrams") {
      const grid = document.createElement("div");
      grid.className = "diagram-grid";

      sec.boxes.forEach((box) => {
        const boxEl = document.createElement("article");
        boxEl.className = "diagram-box";

        const h4 = document.createElement("h4");
        h4.textContent = box.heading;
        boxEl.appendChild(h4);

        if (box.img) {
          const imgWrap = document.createElement("div");
          imgWrap.className = "diagram-img-wrap";

          const img = document.createElement("img");
          img.src = box.img;
          img.alt = box.heading;
          imgWrap.appendChild(img);

          boxEl.appendChild(imgWrap);
        } else {
          const placeholder = document.createElement("div");
          placeholder.className = "diagram-placeholder";
          placeholder.textContent = "Diagram goes here";
          boxEl.appendChild(placeholder);
        }

        if (box.text) {
          const p = document.createElement("p");
          p.textContent = box.text;
          boxEl.appendChild(p);
        }

        grid.appendChild(boxEl);
      });

      sectionEl.appendChild(grid);
    }

    // Finally append the whole section
    content.appendChild(sectionEl);
  });
}

/* Theme toggle with localStorage */
function setupThemeToggle() {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  // 1) Check if user already chose something
  const storedTheme = localStorage.getItem("theme");

  let isDark;
  if (storedTheme === "dark") {
    isDark = true;
  } else if (storedTheme === "light") {
    isDark = false;
  } else {
    // 2) No stored preference → use system preference
    const prefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    isDark = prefersDark;
  }

  // Apply initial theme
  if (isDark) {
    body.classList.add("dark");
    themeIcon.textContent = "☀️"; // sun = currently dark, click for light
  } else {
    body.classList.remove("dark");
    themeIcon.textContent = "🌙"; // moon = currently light, click for dark
  }

  // 3) Let user toggle + store preference
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const nowDark = body.classList.contains("dark");
    themeIcon.textContent = nowDark ? "☀️" : "🌙";
    localStorage.setItem("theme", nowDark ? "dark" : "light");
  });
}


/* Active nav on scroll */
function setupIntersectionObserver() {
  const sections = document.querySelectorAll(".section");
  const navButtons = document.querySelectorAll(".nav button");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navButtons.forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.target === id);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((sec) => observer.observe(sec));
}

function setupLightbox() {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbStage = document.getElementById("lbStage");
  const btnClose = document.getElementById("lbClose");
  const btnIn = document.getElementById("lbZoomIn");
  const btnOut = document.getElementById("lbZoomOut");
  const btnReset = document.getElementById("lbReset");

  if (!lb || !lbImg || !lbStage || !btnClose) return;

  let scale = 1;
  let tx = 0;
  let ty = 0;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  function applyTransform() {
    lbImg.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
  }

  function reset() {
    scale = 1;
    tx = 0;
    ty = 0;
    applyTransform();
  }

  function open(src, alt = "") {
    lbImg.src = src;
    lbImg.alt = alt;
    reset();
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  // Click any diagram image to open
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".diagram-img-wrap img");
    if (!img) return;
    open(img.src, img.alt || "Figure");
  });

  // Close on background click
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target === lbStage) close();
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lb.classList.contains("open")) close();
  });

  // Buttons
  btnClose.addEventListener("click", close);
  btnReset.addEventListener("click", reset);

  btnIn.addEventListener("click", () => {
    scale = clamp(scale + 0.2, 1, 6);
    applyTransform();
  });

  btnOut.addEventListener("click", () => {
    scale = clamp(scale - 0.2, 1, 6);
    applyTransform();
  });

  // Zoom with mouse wheel
  lbStage.addEventListener("wheel", (e) => {
    if (!lb.classList.contains("open")) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    scale = clamp(scale + delta, 1, 6);
    applyTransform();
  }, { passive: false });

  // Drag to pan
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  lbImg.addEventListener("mousedown", (e) => {
    if (!lb.classList.contains("open")) return;
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    tx += (e.clientX - lastX);
    ty += (e.clientY - lastY);
    lastX = e.clientX;
    lastY = e.clientY;
    applyTransform();
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });
}


