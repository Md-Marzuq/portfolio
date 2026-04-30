import type { Portfolio, TagColors } from "../types/portfolio";

export const PORTFOLIO_INFO: Portfolio = {
  meta: {
    createdAt: new Date().toISOString(),
    locale: "en-US",
    url: "", // update if you have a custom domain
    pdf: "/MARZUQ RESUME (3).pdf",
  },
  personal: {
    name: "Mohammed Marzuq",
    title: "IoT Engineer — Robotics and Automation",
    headline: "IoT · Robotics · ESP32 · Python · C",
    // avatar can be a string, an object with { url, label }, or an array of those.
    avatar: [
      // use public root path so Vite serves the static asset from /public/profile.jpg
      { url: "./profile-photo.jpg", label: "" },
      //{ url: "./profile.jpg", label: "" },
      //{ url: "./profile1.jpg", label: "" },
    ],
    summary:
      "IoT Engineer with expertise in robotics and automation, specializing in ESP32-based systems, sensor integration, and cloud connectivity. Experienced in designing smart IoT solutions for environmental monitoring, energy management, and agricultural applications. Proficient in embedded programming with C and Python, with a background in mechanical engineering and robotics research.",
    // optional hero summary used in the site hero; keeps a concise, senior-level intro tuned to your data
    hero: {
      summary:
        "IoT Engineer & Robotics specialist (ESP32, Python, C). I design smart monitoring systems, implement sensor networks, and develop automation solutions — from embedded firmware to cloud dashboards for real-time data and control.",
    },
    contact: {
      email: "marzuq.roboticsautomation@gmail.com",
      phone: "+91 6382068018",
      location: "Chennai, India",
      website: "",
      socials: [
        {
          label: "LinkedIn",
          url: "",
          icon: "SiLinkedin",
        },
        {
          label: "GitHub",
          url: "",
          icon: "SiGithub",
        },
        {
          label: "Hugging Face",
          url: "",
          icon: "SiHuggingface",
        },
        {
          label: "Kaggle",
          url: "",
          icon: "SiKaggle",
          size: 32,
        },
      ],
    },
  },
  highlights: [
    "IoT Engineer at Akvo Atmospheric Water Systems (Feb 2025 – Present)",
    "Research Internship at IIT Madras Research Park (Jan 2024 – Jun 2024)",
    "B.E in Robotics and Automation from Sri Ramakrishna Engineering College",
  ],
  skills: [
    {
      title: "Programming Languages",
      skills: [
        {
          name: "Python",
          level: 85,
          icon: "SiPython",
          category: "backend",
          years: 1,
          note: "Used in IoT projects and automation",
        },
        {
          name: "Cpp, C",
          level: 80,
          icon: "SiC",
          category: "other",
          years: 1,
          note: "Embedded programming for ESP32 and microcontrollers",
        },
      ],
    },
    {
      title: "IoT & Embedded",
      skills: [
        {
          name: "ESP32",
          level: 90,
          category: "other",
          years: 2,
          note: "Microcontroller for IoT projects",
        },
        {
          name: "Arduino",
          level: 85,
          icon: "SiArduino",
          category: "other",
          years: 2,
          note: "Prototyping and embedded development",
        },
        {
          name: "Wi-Fi/GSM",
          level: 80,
          category: "other",
          years: 2,
          note: "Communication modules for IoT",
        },
        {
          name: "MQTT",
          level: 75,
          category: "other",
          years: 1,
          note: "Protocol for IoT messaging",
        },
        {
          name: "Firebase",
          level: 75,
          icon: "SiFirebase",
          category: "database",
          years: 1,
          note: "Cloud database for IoT data",
        },
        {
          name: "Blynk",
          level: 75,
          category: "other",
          years: 1,
          note: "IoT dashboard platform",
        },
      ],
    },
    {
      title: "Robotics & Design",
      skills: [
        {
          name: "Robot Operating System (ROS)",
          level: 70,
          category: "other",
          years: 1,
          note: "Robotics framework",
        },
        {
          name: "Fusion 360",
          level: 80,
          category: "tooling",
          years: 1,
          note: "CAD software for mechanical design",
        },
      ],
    },
    {
      title: "Other Tools",
      skills: [
        {
          name: "Git",
          level: 85,
          icon: "SiGit",
          category: "tooling",
          years: 1,
          note: "Version control",
        },
        {
          name: "GitHub",
          level: 80,
          icon: "SiGithub",
          category: "tooling",
          years: 1,
          note: "Code repository and collaboration",
        },
        {
          name: "VS Code",
          level: 85,
          icon: "SiVisualstudiocode",
          category: "tooling",
          years: 1,
          note: "Primary IDE",
        },
      ],
    },
  ],
  experience: [
    {
      id: "akvo-iot-engineer-2025",
      title: "IoT Engineer",
      company: "Akvo Atmospheric Water Systems Pvt Ltd",
      location: "Chennai, India",
      date: { start: "2025-02", present: true },
      summary:
        "Designing and implementing smart IoT systems for environmental and water monitoring using ESP32 microcontrollers. Developing embedded firmware, integrating sensors and communication modules, and building cloud dashboards for real-time telemetry.",
      bullets: [
        "Designed and implemented smart IoT systems for environmental and water monitoring using ESP32 microcontrollers.",
        "Integrated various sensors (INA219, DHT11/22, temperature) and communication modules (Wi-Fi, GSM) for real-time telemetry.",
        "Developed embedded firmware in C and Arduino IDE, ensuring energy-efficient operation with deep sleep modes and power monitoring.",
        "Implemented cloud dashboards using Blynk and Firebase for live data visualization, alerts, and remote control.",
        "Built robust OTA (Over-the-Air) firmware update systems, improving deployment and maintenance of remote devices.",
        "Contributed to remote diagnostic features and predictive maintenance by integrating real-time data with rule-based alert systems.",
      ],
      tech: [
        "ESP32",
        "C",
        "Arduino",
        "Wi-Fi",
        "GSM",
        "MQTT",
        "Firebase",
        "Blynk",
        "Python",
      ],
    },
    {
      id: "iit-research-intern-2024",
      title: "Research Internship",
      company: "Advanced Manufacturing Technology Development Centre (IIT Madras Research Park)",
      location: "Chennai, India",
      date: { start: "2024-01", end: "2024-06" },
      summary:
        "Researched the application of VTOL drones in large-scale agriculture, focusing on precision irrigation, pest identification, and crop monitoring. Analyzed advancements in sensor integration and autonomous navigation.",
      bullets: [
        "Researched the application of VTOL drones in large-scale agriculture, focusing on precision irrigation, pest identification, and crop monitoring.",
        "Analyzed advancements in sensor integration and autonomous navigation.",
        "Identified cost and regulatory challenges, proposing solutions to improve adoption and sustainability in farming practices.",
      ],
      tech: [
        "VTOL Drones",
        "Sensor Integration",
        "Autonomous Navigation",
        "Precision Agriculture",
      ],
    },
  ],
  projects: [
    {
      id: "smart-iot-energy-monitoring",
      title: "Smart IoT Energy Monitoring & Control System",
      description:
        "Designed and developed an IoT-based energy monitoring system using ESP32 and INA219 sensor to measure voltage, current, power, and energy in real-time. Integrated Blynk dashboard for live data visualization, remote monitoring, and system control. Implemented GSM (SIM800L) and Wi-Fi communication for dual-mode connectivity. Enabled OTA updates for remote firmware deployment and maintenance.",
      tags: ["IoT", "ESP32", "Energy Monitoring", "Blynk", "Firebase", "C", "Arduino"],
      image: "./IMG_20260430_150736.png",
      href: "#",
      links: [
        //{
         // label: "GitHub",
         // url: "https://github.com/satya00089/smart-iot-energy-monitoring",
        //  icon: "SiGithub",
       // },
      ],
      isUnderDevelopment: false,
    },
    {
      id: "drone-monitoring-farms",
      title: "Drone for Monitoring Farms",
      description:
        "IIT Madras Research Park project implementing machine learning algorithms for stable flight in varying conditions. Integrated multiple sensor inputs (LIDAR, GPS, IMU, cameras) for real-time data processing and decision-making. Used AI-based predictive algorithms for component monitoring, reducing downtime by alerting users to potential failures.",
      tags: ["Drones", "VTOL", "Machine Learning", "Sensor Integration", "Agriculture", "ROS"],
      image: "./drone - 1.jpg",
      images: [
        "./drone - 1.jpg",
        "./drone - 2.jpg",
        "./drone - 3.jpg",
        "./drone -4.jpg",
        "./drone -5.jpg",
      ],
      href: "#",
      links: [
        //{
          //label: "GitHub",
          //url: "https://github.com/satya00089/drone-monitoring-farms",
          //icon: "SiGithub",
        //},
      ],
      isUnderDevelopment: true,
    },
    {
      id: "gripper-sand-core",
      title: "Gripper for Handling Sand Core in Diecasting Industries",
      description:
        "Designed a specialized gripper mechanism to handle sand cores with curvy surfaces. Ensured safe and efficient pick-and-place of sand cores into mold cavities. Developed an adaptable gripper for various sand core shapes and sizes, enhancing precision. Reduced manual handling, addressing ergonomic issues and improving safety in the die casting industry.",
      tags: ["Robotics", "Mechanical Design", "Diecasting", "Automation", "Fusion 360"],
      image: "./gripper-sand-core1.jpg",
      images: [
        "./gripper-sand-core1.jpg",
        "./gripper-sand-core2.jpg",
        "./gripper-sand-core3.jpg",
      ],
      href: "#",
      links: [
        //{
          //label: "GitHub",
          //url: "https://github.com/satya00089/gripper-sand-core",
          //icon: "SiGithub",
        //},
      ],
      isUnderDevelopment: false,
    },
    {
      id: "personal-assistant-robot",
      title: "Personal Assistant Robot",
      description:
        "Designed an Arduino-based Personal Assistant Robot for remote assistance. Integrated advanced robotic arm analysis for improved functionality. Aimed to assist elderly and mobility-impaired individuals in daily tasks. Focused on enhancing user independence and accessibility through automation.",
      tags: ["Robotics", "Arduino", "Personal Assistant", "Automation", "Accessibility"],
      image: "./personal-assistant-robot.jpg",
      href: "#",
      links: [
        //{
          //label: "GitHub",
          //url: "https://github.com/satya00089/personal-assistant-robot",
          //icon: "SiGithub",
        //},
      ],
      isUnderDevelopment: false,
    },
    {
      id: "twin-cylinder-boiler",
      title: "Twin Cylinder Low Pressure Boiler",
      description:
        "Designed and developed a twin cylinder low pressure boiler system. Studied a Lamont boiler model, essential for high-pressure applications in various industries. Implemented control systems and safety mechanisms for efficient and safe operation.",
      tags: ["Mechanical Engineering", "Boiler Design", "Control Systems", "Safety", "Diploma Project"],
      image:
        "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2RjaHAxY3N3enY0d3RldWVpczg2ZTNzMHhsY2dpam0yYnp6bWh2byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/P2jddT5c9g9OeHI17p/giphy.gif",
      href: "#",
      links: [
        //{
         // label: "GitHub",
          //url: "",
          //icon: "SiGithub",
        //},
      ],
      isUnderDevelopment: false,
    },
  ],
  education: [
    {
      degree: "B.E in Robotics and Automation",
      school: "Sri Ramakrishna Engineering College",
      date: "2021-2024",
    },
    {
      degree: "Diploma in Mechanical Engineering",
      school: "M.I.E.T Polytechnic College",
      date: "2018-2021",
    },
  ],
  certifications: [
    {
      name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
      issuer: "Microsoft",
      date: "2022",
      url: "https://www.credly.com/badges/56ba404b-b2ec-49d7-b869-d41c8c88d7b5",
    },
    {
      name: "Terraform Associate",
      issuer: "HashiCorp",
      date: "2023",
    },
  ],
  extras: {
    languages: [{ name: "English", level: "Native" }],
    interests: ["astronomy", "music"],
  },
};

// ---------- SMALL HELPERS ----------
export const tagColors: TagColors = {
  // IoT & Embedded
  IoT: "bg-blue-100 text-blue-800",
  ESP32: "bg-green-100 text-green-800",
  "Energy Monitoring": "bg-yellow-100 text-yellow-800",
  Blynk: "bg-purple-100 text-purple-800",
  Firebase: "bg-orange-100 text-orange-800",
  C: "bg-gray-100 text-gray-800",
  Arduino: "bg-red-100 text-red-800",
  WiFi: "bg-indigo-100 text-indigo-800",
  GSM: "bg-pink-100 text-pink-800",
  MQTT: "bg-teal-100 text-teal-800",
  OTA: "bg-cyan-100 text-cyan-800",
  // Robotics & Drones
  Drones: "bg-blue-200 text-blue-900",
  VTOL: "bg-green-200 text-green-900",
  "Machine Learning": "bg-purple-200 text-purple-900",
  "Sensor Integration": "bg-orange-200 text-orange-900",
  Agriculture: "bg-yellow-200 text-yellow-900",
  ROS: "bg-red-200 text-red-900",
  Robotics: "bg-indigo-200 text-indigo-900",
  "Mechanical Design": "bg-pink-200 text-pink-900",
  Diecasting: "bg-teal-200 text-teal-900",
  Automation: "bg-cyan-200 text-cyan-900",
  "Fusion 360": "bg-gray-200 text-gray-900",
  "Personal Assistant": "bg-blue-300 text-blue-900",
  Accessibility: "bg-green-300 text-green-900",
  "Boiler Design": "bg-purple-300 text-purple-900",
  "Control Systems": "bg-orange-300 text-orange-900",
  Safety: "bg-yellow-300 text-yellow-900",
  "Diploma Project": "bg-red-300 text-red-900",
  // Programming
  Python: "bg-blue-500 text-white",
  // Keep some old ones that might still be used
  React: "bg-blue-100 text-blue-800",
  CSS: "bg-teal-100 text-teal-800",
  "Next.js": "bg-black text-white",
  AI: "bg-gray-200 text-gray-800",
};
