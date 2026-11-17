export const profile = {
  name: "Mithilesh Patil",
  fullName: "Mithilesh Narendra Patil",
  role: "Frontend Developer",
  domains: ["Logistics.", "CRM & Sales.", "Banking.", "Healthcare."],
  email: "mithileshp080@gmail.com",
  phone: "+91 9925147151",
  // LinkedIn -> apni profile kholo -> browser address bar se URL copy karke yaha paste karo
  linkedin: "https://www.linkedin.com/in/mithilesh-patil28/",
  // GitHub abhi khali hai -> jab profile bana lo tab "https://github.com/username" daal do, button apne aap dikhne lagega
  github: "",
  whatsapp: "https://wa.me/919925147151?text=Hi%20Mithilesh%2C%20I%20saw%20your%20portfolio!",
  location: "Surat, Gujarat",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Surat%2C%20Gujarat",
  // Contact form key comes from .env (VITE_WEB3FORMS_KEY). Empty -> form opens the mail app.
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY || "",
  resume: "/Mithilesh_Patil_Resume.pdf?v=5",
  photo: "/photo.webp",
  summary:
    "Frontend Developer at DCPL Technology Pvt. Ltd., building scalable ReactJS applications and enterprise-grade admin panels across CRM, logistics, banking and healthcare. I care about clean component architecture, airtight RBAC, smooth real-time UI and responsive Bootstrap-powered interfaces.",
};

export const glance = [
  { icon: "briefcase", title: "DCPL Technology", text: "Frontend Developer · Sep 2025 – Present" },
  { icon: "layers", title: "4 Admin Panels", text: "Built and shipped to production" },
  { icon: "grid", title: "4 Industries", text: "Logistics · CRM · Banking · Healthcare" },
  { icon: "book", title: "B.Tech — IT", text: "CGPIT, Bardoli · Class of 2023" },
];

export const services = [
  {
    icon: "layout",
    title: "Enterprise Admin Panels",
    text: "Four production panels shipped across logistics, CRM, banking and healthcare — from login to reports.",
    tag: "Harson · CRM · BKN · Clinic",
  },
  {
    icon: "shield",
    title: "RBAC & Access Control",
    text: "Feature-level permissions for every user role, keeping sensitive business data strictly private.",
    tag: "Roles · Permissions · Sessions",
  },
  {
    icon: "file",
    title: "Quotation & Document Engines",
    text: "Multi-version quotations with auto tax calculation, plus instant PDF invoices and banking proformas.",
    tag: "PDF · Versioning · Tax logic",
  },
  {
    icon: "table",
    title: "Smart Data Tables",
    text: "Persistent search filters, sorting, pagination and one-click Excel export across every module.",
    tag: "Filters · Pagination · Excel",
  },
  {
    icon: "chart",
    title: "Dashboards & Analytics",
    text: "Interactive dashboards giving branch managers real-time insight into sales and payments.",
    tag: "Charts · KPIs · Real-time",
  },
  {
    icon: "calendar",
    title: "Scheduling & Workflows",
    text: "Drag-and-drop appointment calendars, multi-step job flows and automated email / SMS reminders.",
    tag: "Calendar · Automation",
  },
];

export const skills = {
  Frontend: ["ReactJS", "NextJS", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Responsive UI"],
  "Tools & Practices": [
    "Git",
    "REST APIs",
    "State Mgmt",
    "RBAC",
    "PDF Reports",
    "Excel Export",
    "Agile / Scrum",
    "Dashboards",
  ],
};

export const projects = [
  {
    title: "Harson Exim Admin Panel",
    image: "/projects/harson.webp",
    domain: "Logistics",
    color: "from-violet-500 to-fuchsia-500",
    accent: "#a855f7",
    blurb: "End-to-end freight & clearing job management for a logistics business.",
    points: [
      "Freight & Clearing Job Management with multi-step workflows, booking management and real-time document tracking.",
      "Quotation Management module with dynamic filtering, version control and instant Excel report generation.",
      "Custom data tables with persistent search filters, sorting and pagination across modules.",
      "Secure RBAC with precise feature-level permissions for every user role.",
      "Scalable global state with persistent sessions and seamless API integration.",
    ],
    tags: ["React", "RBAC", "Excel Export", "Global State", "REST API"],
  },
  {
    title: "CRM Admin Panel",
    image: "/projects/crm.webp",
    domain: "Sales / CRM",
    color: "from-cyan-400 to-blue-500",
    accent: "#22d3ee",
    blurb: "One place for leads, contacts and complex sales workflows.",
    points: [
      "Centralised leads, contacts and multi-stage sales workflows to streamline team operations.",
      "Quotation engine with multi-version revision history, automated tax calculations and instant PDF generation.",
      "High-performance data tables with persistent filters, sorting and pagination.",
      "Role-based access control ensuring strict data privacy.",
    ],
    tags: ["React", "PDF Engine", "Tax Logic", "RBAC", "Bootstrap"],
  },
  {
    title: "BKN Admin Panel",
    image: "/projects/bkn.webp",
    domain: "Banking / Enterprise",
    color: "from-amber-400 to-orange-500",
    accent: "#f59e0b",
    blurb: "Enterprise portal for purchase orders, sales and multi-branch operations.",
    points: [
      "Manages purchase orders, sales and multi-branch business operations at scale.",
      "In-browser document generation engine for banking proformas, invoices and reports.",
      "Interactive analytics dashboards giving branch managers real-time sales & payment insights.",
      "Rich-text editing tools embedded in admin workflows for communication and configuration.",
    ],
    tags: ["React", "Dashboards", "Doc Generation", "Rich Text", "Analytics"],
  },
  {
    title: "Appointment Admin Panel",
    image: "/projects/appointment.webp",
    domain: "Healthcare",
    color: "from-emerald-400 to-teal-500",
    accent: "#10b981",
    blurb: "Clinic scheduling platform for doctors, patients and treatments.",
    points: [
      "High-performance scheduling platform managing doctors, patients and treatments.",
      "Real-time interactive calendar with drag-and-drop appointment booking.",
      "Automated follow-up workflows with customizable email / SMS reminders to reduce no-shows.",
      "Dynamic patient forms wired to centralised state for instant, secure sync.",
    ],
    tags: ["React", "Drag & Drop", "Calendar", "Automation", "Forms"],
  },
];

export const experience = [
  {
    role: "Frontend Developer (ReactJS)",
    company: "DCPL Technology Private Limited",
    place: "Surat, Gujarat",
    period: "Sep 2025 — Present",
    type: "Full-time",
    summary:
      "Building enterprise-grade admin panels end-to-end for clients in logistics, sales, banking and healthcare — owning UI architecture, API integration, access control and document generation.",
    highlights: [
      "Delivered 4 production admin panels across logistics, CRM, banking and healthcare domains.",
      "Designed a reusable RBAC system with feature-level permissions shared across products.",
      "Built custom data tables with persistent search filters, sorting and pagination used in every module.",
      "Engineered quotation engines with multi-version history, automated tax calculation and PDF / Excel output.",
      "Created an in-browser document engine for banking proformas, invoices and reports.",
      "Architected global state management with persistent sessions and clean REST API integration.",
      "Developed a drag-and-drop appointment calendar with automated email / SMS follow-ups.",
      "Integrated analytics dashboards and rich-text editors into day-to-day admin workflows.",
    ],
    stack: ["ReactJS", "NextJS", "JavaScript ES6+", "Bootstrap", "Tailwind CSS", "REST APIs", "Git", "Agile / Scrum"],
  },
];

export const education = {
  degree: "Bachelor of Technology",
  field: "Information Technology",
  school: "Chhotubhai Gopalbhai Patel Institute of Technology",
  city: "Bardoli, Surat",
  year: "Graduated June 2023",
};

export const languages = ["English", "Hindi", "Gujarati", "Marathi"];
