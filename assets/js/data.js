// assets/js/data.js

const siteData = {
  profile: {
  initials: "SA",
  photoUrl: "assets/img/profile.jpg",   // update if you have a different photo
  name: "Sana Amjad",
  title: "Researcher & Lecturer",
  location: "Vienna, Austria",
  keywords: [
    "Blockchain",
    "Federated Learning",
    "AI / Machine Learning",
    "IoT Security",
    "Privacy & Trust",
    "Web3"
  ]
},

contact: [
  {
    label: "Email",
    icon: "bi bi-envelope-fill",
    html: '<a href="mailto:sanaamjad702@gmail.com">sanaamjad702@gmail.com</a>'
  },
  {
    label: "Phone",
    icon: "bi bi-telephone-fill",
    html: "(+43) 660 2335007"
  },
  {
    label: "Location",
    icon: "bi bi-geo-alt-fill",
    html: "Vienna, Austria"
  }
],

profiles: [
  {
    name: "Google Scholar",
    icon: "bi bi-mortarboard",
    url: "https://scholar.google.com"
  },
  {
    name: "LinkedIn",
    icon: "bi bi-linkedin",
    url: "https://www.linkedin.com"
  },
  {
    name: "GitHub",
    icon: "bi bi-github",
    url: ""   // add if/when you want it public
  },
  {
    name: "CV",
    icon: "bi bi-file-earmark-person-fill",
    url: "Sana_CV.pdf"
  }
],

  sections: [
  {
    id: "about",
    navLabel: "About",
    title: "About",
    subtitle: "Profile",
    type: "text",
    paragraphs: [
      "I am a researcher and lecturer with a strong background in blockchain technologies, IoT security, federated learning, and machine learning–driven systems. I currently work as a Junior Researcher at the Austrian Blockchain Center in Vienna, contributing to applied research and EU-funded innovation projects.",
      "I hold both a Bachelor’s and Master’s degree in Software Engineering from COMSATS University Islamabad. My work bridges academic research and real-world system development, with experience in blockchain-based authentication, secure data storage, incentive mechanisms, and decentralized digital ecosystems.",
      "Alongside research, I have teaching and supervision experience at university level, mentoring undergraduate and master’s students in computer science, data science, security, and research methodology."
    ],
    metrics: [
      "Junior Researcher at Austrian Blockchain Center",
      "University teaching experience",
      "IEEE & MDPI journal publications",
      "Blockchain, IoT & AI research",
      "Based in Vienna, Austria"
    ]
  },

  {
    id: "experience",
    navLabel: "Experience",
    title: "Experience",
    subtitle: "Academic & Research",
    type: "timeline",
    items: [
      {
        role: "Junior Researcher",
        org: "Austrian Blockchain Center (ABC Research GmbH)",
        meta: "Oct 2022 – Present · Vienna, Austria",
        description:
          "Designed blockchain-based document workflows for ESG compliance, developed token-based incentive mechanisms for UNICEF-supported citizen science initiatives, and analyzed blockchain–IoT connection patterns published in peer-reviewed venues. Contributed to EU and FFG-funded projects including Applied CPS EDIH and Data Provider Web3, covering system testing, security analysis, and blockchain explorer evaluation.",
        pills: [
          "Blockchain",
          "Web3",
          "ESG",
          "IoT",
          "Federated Learning",
          "Smart Contracts"
        ]
      },
      {
        role: "Lecturer",
        org: "SZABIST University",
        meta: "Apr 2022 – Oct 2022 · Islamabad, Pakistan",
        description:
          "Taught undergraduate Computer Science courses and supervised final-year bachelor projects, providing guidance on system design, implementation, and documentation.",
        pills: ["Teaching", "Supervision", "Computer Science"]
      },
      {
        role: "Research Assistant",
        org: "ComSens Research Lab, COMSATS University Islamabad",
        meta: "Feb 2020 – Apr 2022 · Islamabad, Pakistan",
        description:
          "Worked on blockchain-based authentication and secure data storage for wireless sensor networks using IPFS and encryption. Developed DDR-LEACH-based routing and CNN-driven malicious node detection models. Co-authored IEEE and MDPI publications and mentored students in research and experimentation.",
        pills: [
          "IoT Security",
          "Blockchain",
          "Machine Learning",
          "Wireless Sensor Networks"
        ]
      }
    ]
  },

  {
    id: "education",
    navLabel: "Education",
    title: "Education",
    subtitle: "Degrees",
    type: "timeline",
    items: [
      {
        role: "Master of Science in Software Engineering",
        org: "COMSATS University Islamabad, Pakistan",
        meta: "Jan 2019 – Feb 2022",
        description:
          "Focused on blockchain systems, IoT security, machine learning, and secure routing protocols."
      },
      {
        role: "Bachelor of Science in Software Engineering",
        org: "COMSATS University Islamabad, Pakistan",
        meta: "Feb 2015 – Jan 2019",
        description:
          "Undergraduate training in software engineering, programming, databases, and distributed systems."
      }
    ]
  },

  {
    id: "research",
    navLabel: "Research",
    title: "Research",
    subtitle: "Interests & Expertise",
    type: "text",
    paragraphs: [
      "My research interests focus on blockchain-based security and privacy, federated learning, IoT authentication, and trust-aware decentralized systems. I work on designing secure architectures that combine blockchain, machine learning, and cryptographic techniques.",
      "I have published in IEEE Access, MDPI Sensors, and international IEEE conferences, and actively collaborate on interdisciplinary projects spanning blockchain, AI, and digital ecosystems."
    ],
    pills: [
      "Blockchain security",
      "IoT & WSNs",
      "Federated Learning",
      "Machine & Deep Learning",
      "Privacy & Trust",
      "Smart Contracts",
      "Decentralized Systems"
    ]
  },

  {
    id: "publications",
    navLabel: "Publications",
    title: "Publications",
    subtitle: "Selected Works",
    type: "publications",
    intro:
      'Selected peer-reviewed journal and conference publications. A complete list is available on my <a href="#" target="_blank">Google Scholar</a> profile.',
    maxItem: 4
  },

  {
    id: "contact",
    navLabel: "Contact",
    title: "Research & Teaching at a Glance",
    subtitle: "Overview",
    type: "diagrams",
    boxes: [
      {
        heading: "Blockchain & Web3",
        text: "Smart contracts, ESG workflows, token platforms, and decentralized applications.",
        img: null
      },
      {
        heading: "IoT & Security",
        text: "Authentication, trust evaluation, secure routing, and malicious node detection.",
        img: null
      },
      {
        heading: "AI & Federated Learning",
        text: "Machine learning, deep learning, and privacy-aware distributed learning systems.",
        img: null
      },
      {
        heading: "Teaching & Mentoring",
        text: "University teaching, student supervision, research mentoring, and academic writing support.",
        img: null
      }
    ]
  }
]

};
