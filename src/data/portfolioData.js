export const personalInfo = {
  name: "Selva Guru Karthikeyan P",
  shortName: "Selva Guru",
  initials: "SGK",
  title: "AI & Data Science Student • GUI & Graphics Designer",
  tagline: "Artificial Intelligence & Data Science student and GUI / Graphics Designer. Building machine learning pipelines, mobile apps, and modern visual interfaces.",
  location: "Tamil Nadu, India",
  timezone: "IST (UTC +5:30)",
  email: "sgkarthi1910@gmail.com",
  phone: "",
  github: "https://github.com/sgkarthi1910-rgb",
  linkedin: "https://www.linkedin.com/in/selva-guru-karthikeyan-409a43376",
  discord: "https://discord.com/users/1192870797191159829",
  twitter: "",
  resumeUrl: "#contact",
  availableForHire: true,
  status: "AI & Data Science Student • Open for Opportunities",
  bio: [
    "I am an Artificial Intelligence & Data Science student with a passionate focus on GUI and graphics design. I work across the spectrum of machine learning and modern user interface engineering.",
    "My technical work spans building data science and machine learning pipelines in Python, creating cross-platform mobile apps with Flutter and React Native, and designing clean, intuitive graphical interfaces in Figma and Adobe Photoshop.",
    "I strive to build functional, intelligent software that pairs computational models with aesthetically refined, user-friendly visual design."
  ],
  stats: [
    { label: "Core Projects Built", value: "4", suffix: "" },
    { label: "Technology Stacks", value: "10+", suffix: "" },
    { label: "Hackathons & Sprints", value: "2+", suffix: "" },
    { label: "Graduation Term", value: "2026", suffix: "" }
  ]
};

export const skillsData = [
  {
    category: "Artificial Intelligence & Machine Learning",
    description: "Training machine learning models, exploratory data analysis, and predictive statistical pipelines in Python.",
    skills: [
      { name: "Python (NumPy, Pandas)", level: 92, icon: "Terminal", color: "#3776ab" },
      { name: "Scikit-Learn (Classification/Regression)", level: 88, icon: "Cpu", color: "#f97316" },
      { name: "Exploratory Data Analysis (EDA)", level: 90, icon: "Network", color: "#00b4d8" },
      { name: "Random Forest & Model Tuning", level: 86, icon: "Zap", color: "#f59e0b" },
      { name: "Data Preprocessing & StandardScaler", level: 88, icon: "CheckCircle", color: "#10b981" },
      { name: "Matplotlib & Seaborn Visualization", level: 89, icon: "Sparkles", color: "#ec4899" }
    ]
  },
  {
    category: "GUI Architecture & Graphics Design",
    description: "Crafting modern graphical user interfaces, design systems, visual assets, and responsive digital layouts.",
    skills: [
      { name: "UI/UX Design & Wireframing", level: 92, icon: "Palette", color: "#f24e1e" },
      { name: "Adobe Photoshop", level: 88, icon: "Layers", color: "#31a8ff" },
      { name: "Figma & Interactive Prototyping", level: 90, icon: "Palette", color: "#a855f7" },
      { name: "Visual Identity & Graphic Assets", level: 86, icon: "Sparkles", color: "#ec4899" },
      { name: "Design Systems & Component Tokens", level: 88, icon: "Boxes", color: "#8b5cf6" },
      { name: "Typography & Micro-Interactions", level: 90, icon: "Atom", color: "#06b6d4" }
    ]
  },
  {
    category: "Mobile & Web Engineering",
    description: "Developing cross-platform mobile applications and responsive frontend web applications.",
    skills: [
      { name: "Flutter & Dart", level: 88, icon: "Globe", color: "#02569b" },
      { name: "React Native & Expo", level: 90, icon: "Bot", color: "#61dafb" },
      { name: "React 19 & Next.js", level: 90, icon: "Atom", color: "#38bdf8" },
      { name: "TypeScript & JavaScript", level: 88, icon: "Terminal", color: "#3178c6" },
      { name: "Tailwind CSS & NativeWind", level: 94, icon: "Palette", color: "#06b6d4" },
      { name: "HTML5 & Modern CSS3", level: 92, icon: "Layers", color: "#e34f26" }
    ]
  },
  {
    category: "Backend, Database & Developer Tooling",
    description: "Managing databases, authentication services, backend APIs, and version control workflows.",
    skills: [
      { name: "Firebase Auth & User Sessions", level: 88, icon: "Zap", color: "#ffca28" },
      { name: "Cloud Firestore NoSQL Database", level: 86, icon: "Database", color: "#f58220" },
      { name: "Firebase Cloud Storage", level: 85, icon: "HardDrive", color: "#ff9100" },
      { name: "Node.js & Express Microservices", level: 84, icon: "Server", color: "#68a063" },
      { name: "tRPC & End-to-End Type Safety", level: 82, icon: "Network", color: "#398ccb" },
      { name: "Git, GitHub & Version Control", level: 90, icon: "GitBranch", color: "#f43f5e" }
    ]
  }
];

export const projectsData = [
  {
    id: "krishi-agro-assist",
    title: "Krishi AgroAssist - Multilingual Agricultural AI Mobile App",
    category: "Mobile & Web Apps",
    badge: "SIH Hackathon",
    description: "A multimodal agricultural mobile assistant designed for farmers, featuring multilingual interaction, voice assistance, and camera-based crop disease consultation.",
    fullDescription: "Developed for the Smart India Hackathon to assist farmers with accessible agricultural intelligence. Engineered with React Native, Expo, and NativeWind, featuring native Malayalam vernacular keyboard integration, audio voice note recording via Expo AV, camera-enabled leaf/crop condition diagnosis, and offline connectivity indicators.",
    technologies: ["React Native", "Expo", "TypeScript", "NativeWind", "Tailwind CSS", "Expo AV", "Lucide Icons"],
    metrics: "Multimodal Voice & Camera Assistant",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80",
    demoUrl: "https://github.com/sgkarthi1910-rgb",
    githubUrl: "https://github.com/sgkarthi1910-rgb",
    highlights: [
      "Custom vernacular virtual keyboard support (Malayalam) for regional accessibility",
      "Audio recording and voice query input for hands-free farmer usability",
      "Camera capture and image attachment integration for crop disease consultation",
      "Real-time network connectivity detection with graceful offline messaging state"
    ]
  },
  {
    id: "ai-business-assistant",
    title: "AI Advertising & Fundraising Assistant for Small Businesses",
    category: "AI & Machine Learning",
    badge: "Full-Stack Web",
    description: "An end-to-end business growth engine leveraging AI for automated marketing content generation, campaign planning, and community fundraising support.",
    fullDescription: "A full-stack platform built with React 19, TypeScript, and Express in a Turborepo monorepo. It features a resource-aware AI growth manager that plans marketing campaigns based on budget and skill constraints, coupled with an interactive community fundraising pitch portal, skill matching, and social media posting workflows.",
    technologies: ["React 19", "TypeScript", "Tailwind CSS", "TanStack Router", "Node.js", "Express", "tRPC", "Better Auth", "MongoDB", "Turborepo"],
    metrics: "Type-Safe Full-Stack Monorepo",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    demoUrl: "https://github.com/sgkarthi1910-rgb",
    githubUrl: "https://github.com/sgkarthi1910-rgb",
    highlights: [
      "Automated marketing content generator and social media campaign planner",
      "Community-driven fundraising portal supporting milestone tracking and skill collaboration",
      "Type-safe end-to-end communication via tRPC with React 19 and Express",
      "Clean modern UI with Tailwind CSS and Radix UI accessible component primitives"
    ]
  },
  {
    id: "wine-quality-ml",
    title: "Wine Quality Prediction & Exploratory Data Analysis Pipeline",
    category: "Data Science & Analytics",
    badge: "Machine Learning",
    description: "An automated machine learning classification and exploratory data analysis pipeline evaluating physicochemical properties to predict quality ratings.",
    fullDescription: "An end-to-end data science study analyzing 11 physicochemical attributes (alcohol, volatile acidity, sulphates, etc.). Implements comprehensive exploratory data analysis (EDA) with correlation heatmaps, feature distribution plots, StandardScaler preprocessing, Random Forest classification, and hyperparameter tuning with GridSearchCV.",
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    metrics: "Random Forest & GridSearchCV Tuning",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    demoUrl: "https://github.com/sgkarthi1910-rgb",
    githubUrl: "https://github.com/sgkarthi1910-rgb",
    highlights: [
      "Exploratory Data Analysis with correlation heatmaps and feature distributions",
      "StandardScaler normalization with 80:20 train-test stratification",
      "Random Forest Classifier tuned via GridSearchCV cross-validation",
      "Feature importance evaluation identifying key chemical drivers of quality"
    ]
  },
  {
    id: "flutter-student-management",
    title: "Student Management & Cloud Authentication App",
    category: "Mobile & Web Apps",
    badge: "Flutter & Firebase",
    description: "A cross-platform mobile application delivering real-time student record management, cloud synchronization, and role-based user authentication.",
    fullDescription: "Built with Flutter and Dart, connecting directly to Google Firebase backend services. Provides user login and signup flows with Firebase Auth, live reactive synchronization of student directory records using Cloud Firestore, and cloud asset storage for student profile media.",
    technologies: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "Firebase Storage", "Provider"],
    metrics: "Real-Time Cloud Synchronization",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
    demoUrl: "https://github.com/sgkarthi1910-rgb",
    githubUrl: "https://github.com/sgkarthi1910-rgb",
    highlights: [
      "Firebase Authentication for secure email and password sign-in flows",
      "Real-time NoSQL document CRUD operations using Cloud Firestore",
      "Cloud file upload and profile picture handling with Firebase Storage",
      "Reactive architecture with Provider for predictable UI state updates"
    ]
  }
];

export const experienceData = [
  {
    role: "Mobile & AI Application Developer",
    organization: "Smart India Hackathon (SIH) Project",
    period: "2024",
    type: "Hackathon Project",
    description: "Developed 'Krishi AgroAssist', an agricultural AI assistant mobile app empowering farmers with vernacular multimodal interaction.",
    bullets: [
      "Engineered an interactive mobile interface using React Native, Expo, and NativeWind with vernacular keyboard support (Malayalam).",
      "Integrated audio recording and voice-based question handling for hands-free farmer accessibility.",
      "Implemented image capture for crop disease consultation and offline connectivity indicators."
    ]
  },
  {
    role: "Flutter & Mobile App Development Intern",
    organization: "Student Management & Cloud System",
    period: "2024",
    type: "Practical Internship",
    description: "Built and architected a cross-platform student record management and authentication mobile application.",
    bullets: [
      "Integrated Firebase Authentication with robust email-based user verification and state persistence.",
      "Engineered real-time CRUD data pipelines connecting Cloud Firestore for student records.",
      "Implemented profile media uploads using Firebase Cloud Storage and reactive UI state with Provider."
    ]
  }
];

export const educationData = [
  {
    degree: "Bachelor of Technology (B.Tech) in Artificial Intelligence & Data Science",
    institution: "Engineering College • Tamil Nadu, India",
    period: "2022 - 2026",
    details: "Core Coursework: Artificial Intelligence, Data Science, Machine Learning, Data Structures & Algorithms, Database Management Systems, and Human-Computer Interaction (HCI) / GUI Design."
  }
];

export const certificationsData = [
  {
    title: "Smart India Hackathon (SIH) Project Developer",
    issuer: "Ministry of Education & AICTE",
    date: "2024",
    badge: "Hackathon",
    icon: "Sparkles"
  },
  {
    title: "Machine Learning & Exploratory Data Analysis with Python",
    issuer: "Scikit-Learn, Pandas & Seaborn Pipeline",
    date: "2024",
    badge: "Data Science",
    icon: "Terminal"
  },
  {
    title: "Cross-Platform Mobile App Development (Flutter & Firebase)",
    issuer: "Dart, Cloud Firestore & Firebase Auth",
    date: "2024",
    badge: "Mobile Dev",
    icon: "Cpu"
  },
  {
    title: "GUI & Graphics Design Systems",
    issuer: "UI/UX, Layout Architecture & Typography",
    date: "2024",
    badge: "GUI Design",
    icon: "Palette"
  }
];

export const terminalCommands = {
  help: [
    "AI & Data Science Command Deck:",
    "  about        - Inspect Profile (Selva Guru Karthikeyan P)",
    "  skills       - View Machine Learning, Mobile & GUI Design Stacks",
    "  projects     - List Real Work (SIH, AI Assistant, ML Pipeline, Flutter)",
    "  contact      - Establish Direct Comm Link with Selva Guru",
    "  ml           - Query Machine Learning & Data Science Pipeline Telemetry",
    "  gui          - Query Design System Tokens & Color Palettes",
    "  sudo hire    - Issue Priority Project / Opportunity Invitation",
    "  clear        - Clear Terminal Output"
  ],
  ml: [
    "DATA SCIENCE & ML TELEMETRY: SCIKIT-LEARN & PYTHON",
    "Model: RandomForestClassifier (n_estimators=100)",
    "Preprocessing: StandardScaler Normalization (80:20 Train-Test)",
    "Optimization: GridSearchCV with 5-Fold Cross-Validation",
    "Status: Optimal Convergence • Exported Heatmaps & Importance Rankings"
  ],
  gui: [
    "COSMIC GUI DESIGN SYSTEM TOKENS:",
    "Primary: #38bdf8 (Electric Cyan) • Secondary: #a855f7 (Cosmic Violet)",
    "Background: #08090e (Deep Cosmic Obsidian) • Typography: Inter / JetBrains Mono",
    "Design Principles: 60 FPS Micro-interactions, Glassmorphism, Clean Hierarchy"
  ],
  about: [
    "Selva Guru Karthikeyan P",
    "Role: Artificial Intelligence & Data Science Student | GUI & Graphics Designer",
    "Location: Tamil Nadu, India",
    "Focus: Building practical machine learning pipelines, mobile apps, and modern visual GUI interfaces."
  ],
  skills: [
    "AI / Data Science : Python, Scikit-Learn, Pandas, NumPy, Matplotlib, Seaborn",
    "Mobile & Web     : Flutter, Dart, React Native, Expo, React 19, TypeScript, Tailwind CSS",
    "GUI & Graphics   : Adobe Photoshop, Figma, Layout Design, Typography, Design Systems",
    "Backend & Cloud  : Firebase (Auth/Firestore/Storage), Node.js, Express, tRPC, MongoDB"
  ],
  projects: [
    "1. Krishi AgroAssist  - Multilingual Agricultural AI Assistant (SIH)",
    "2. AI Ad & Fund Suite - AI Marketing & Fundraising Platform (React 19 / tRPC)",
    "3. Wine Quality ML    - Machine Learning Classification & EDA Pipeline (Python)",
    "4. Student Manager    - Flutter & Firebase Mobile Record Management App"
  ],
  contact: [
    "Email    : sgkarthi1910@gmail.com",
    "LinkedIn : linkedin.com/in/selva-guru-karthikeyan-409a43376",
    "Discord  : https://discord.com/users/1192870797191159829",
    "GitHub   : github.com/sgkarthi1910-rgb",
    "Location : Tamil Nadu, India (IST UTC+5:30)"
  ],
  socials: [
    "GitHub   : https://github.com/sgkarthi1910-rgb",
    "LinkedIn : https://www.linkedin.com/in/selva-guru-karthikeyan-409a43376",
    "Discord  : https://discord.com/users/1192870797191159829"
  ],
  education: [
    "Degree     : B.Tech in Artificial Intelligence & Data Science",
    "Status     : Undergraduate Student",
    "Location   : Tamil Nadu, India",
    "Period     : 2022 - 2026"
  ],
  "sudo hire": [
    "ACCESS GRANTED.",
    "Candidate: Selva Guru Karthikeyan P",
    "Domain: AI & Data Science + GUI & Graphics Designer",
    "Action: Click 'Get In Touch' or email directly at sgkarthi1910@gmail.com to connect!"
  ]
};
