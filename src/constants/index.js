import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  threejs,
} from "../assets";

export const navLinks = [
  { id: "about",    title: "About"    },
  { id: "tech",     title: "Skills"   },
  { id: "projects", title: "Projects" },
  { id: "contact",  title: "Contact"  },
];

const services = [
  { title: "Frontend Developer",    icon: web     },
  { title: "React.js Developer",    icon: mobile  },
  { title: "UI/UX Implementation",  icon: creator },
  { title: "WordPress Developer",   icon: backend },
];

const technologies = [
  { name: "HTML 5",       icon: html       },
  { name: "CSS 3",        icon: css        },
  { name: "JavaScript",   icon: javascript },
  { name: "React JS",     icon: reactjs    },
  { name: "Tailwind CSS", icon: tailwind   },
  { name: "Node JS",      icon: nodejs     },
  { name: "MongoDB",      icon: mongodb    },
  { name: "Three JS",     icon: threejs    },
  { name: "Git",          icon: git        },
  { name: "Figma",        icon: figma      },
];

const experiences = [
  {
    title: "Diploma in Software Development",
    company_name: "Aptech",
    icon: backend,
    iconBg: "#16161e",
    date: "In Progress",
    points: [
      "Pursuing a professional diploma focused on software development fundamentals and practices.",
      "Studying modern programming languages, web technologies, and development workflows.",
      "Building hands-on projects to apply theoretical knowledge in real-world scenarios.",
      "Gaining structured training in problem-solving, debugging, and software engineering principles.",
    ],
  },
  {
    title: "Intermediate",
    company_name: "CMS College, Karachi",
    icon: creator,
    iconBg: "#111118",
    date: "Karachi, Pakistan",
    points: [
      "Completed intermediate-level education providing a strong academic foundation.",
      "Developed analytical thinking and communication skills applicable to technical roles.",
    ],
  },
];

const testimonials = [];

const projects = [
  /* ─── 1. FurEver Care ─────────────────────────────── */
  {
    slug:        "fur-ever-care",
    name:        "FurEver Care",
    tagline:     "Connecting pet owners with trusted care services.",
    description: "A responsive pet care website with a modern UI, informative sections, and smooth navigation — built to connect pet owners with care services.",
    overview:
      "FurEver Care is a fully responsive multi-section website designed for a pet care service provider. " +
      "The site presents services, team information, and contact details in a visually engaging layout that " +
      "works seamlessly across all screen sizes. The design focuses on warmth, trust, and accessibility " +
      "to appeal to pet owners seeking reliable care for their animals.",
    goal:
      "Design and build a professional marketing website that establishes brand credibility, clearly communicates " +
      "available services, and makes it easy for potential clients to get in touch — all without a backend.",
    features: [
      "Fully responsive layout — mobile, tablet and desktop",
      "Multi-section design: Hero, Services, About, Team, Contact",
      "Smooth scroll navigation and CSS hover animations",
      "mailto-based contact form, deployed on Vercel",
    ],
    tech:   ["HTML5", "CSS3", "JavaScript", "Vercel"],
    role:
      "Sole developer — designed the layout, wrote all HTML/CSS/JS from scratch, optimised for performance " +
      "and cross-browser compatibility, and deployed to Vercel.",
    tags: [
      { name: "html5",      color: "blue-text-gradient"  },
      { name: "css3",       color: "green-text-gradient" },
      { name: "javascript", color: "cyan-text-gradient"  },
    ],
    screenshot:       "/projects/furever-care.jpg",
    live_demo_link:   "https://fur-ever-care-pet-care-website.vercel.app/",
    source_code_link: "https://github.com/WasayWithCode",
  },

  /* ─── 2. Student Registration Portal ─────────────── */
  {
    slug:        "student-registration",
    name:        "Student Registration Portal",
    tagline:     "Streamlined academic registration with live validation.",
    description: "A clean, functional student registration portal with form validation, dynamic entries, and a responsive layout — ideal for academic administration.",
    overview:
      "The Student Registration Portal is a browser-based application that allows students to submit " +
      "registration details through a structured, validated form. Submitted entries are displayed " +
      "dynamically in a table without any page reload. The project demonstrates core JavaScript DOM " +
      "manipulation, real-time input validation, and clean UI presentation.",
    goal:
      "Build a lightweight, dependency-free registration system that validates user input in real time, " +
      "stores entries in the session, and presents them in a readable table — suitable for academic " +
      "administration workflows.",
    features: [
      "Real-time form validation with clear error messages",
      "Dynamic table updates instantly on each new submission",
      "Input sanitisation — prevents empty or malformed entries",
      "Zero dependencies, hosted on GitHub Pages",
    ],
    tech:   ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    role:
      "Sole developer — architected the form validation logic, built the dynamic DOM rendering for the " +
      "results table, styled the UI, and published the project to GitHub Pages.",
    tags: [
      { name: "html5",      color: "blue-text-gradient"  },
      { name: "css3",       color: "green-text-gradient" },
      { name: "javascript", color: "cyan-text-gradient"  },
    ],
    screenshot:       "/projects/student-registration.jpg",
    live_demo_link:   "https://wasaywithcode.github.io/Student-Registration-Portal/",
    source_code_link: "https://github.com/WasayWithCode/Student-Registration-Portal",
  },

  /* ─── 3. Sanjalika Water Park ─────────────────────── */
  {
    slug:        "sanjalika-water-park",
    name:        "Sanjalika Water Park",
    tagline:     "A vibrant web presence for a real water park.",
    description: "A vibrant, fully responsive website for a water park featuring attraction listings, hero sections, and an engaging visual experience.",
    overview:
      "The Sanjalika Water Park website is a visually rich, multi-section marketing site built to showcase " +
      "the park's attractions, ticket information, and gallery. Built with React.js and Tailwind CSS, the " +
      "site uses bold imagery, animated sections, and clear calls-to-action to drive visitor interest and " +
      "footfall. It is deployed on Vercel and loads fast on all devices.",
    goal:
      "Create an eye-catching, conversion-focused website that communicates the energy of the water park, " +
      "highlights its attractions, and gives visitors the information they need to plan a visit.",
    features: [
      "Full-screen hero section with imagery and call-to-action",
      "Attractions showcase with hover-effect cards and gallery",
      "Ticket and pricing information section",
      "Mobile-first responsive design, deployed on Vercel",
    ],
    tech:   ["React.js", "Tailwind CSS", "JavaScript", "Vercel"],
    role:
      "Sole developer — designed the component hierarchy, implemented all sections using React functional " +
      "components and Tailwind utility classes, sourced and optimised imagery, and deployed to Vercel.",
    tags: [
      { name: "react",      color: "blue-text-gradient"  },
      { name: "tailwind",   color: "green-text-gradient" },
      { name: "javascript", color: "cyan-text-gradient"  },
    ],
    screenshot:       "/projects/sanjalika-water-park.jpg",
    live_demo_link:   "https://sanjalika-water-park-five.vercel.app/",
    source_code_link: "https://github.com/WasayWithCode",
  },

  /* ─── 4. ERP Pathway ──────────────────────────────── */
  {
    slug:        "erp-pathway",
    name:        "ERP Pathway",
    tagline:     "A clean onboarding platform for ERP solutions.",
    description: "A professional ERP information and onboarding platform with structured navigation, clean typography, and a modern dark theme.",
    overview:
      "ERP Pathway is a professional informational platform designed to introduce businesses to ERP " +
      "solutions and guide them through the onboarding journey. The site features a dark, modern aesthetic " +
      "with structured navigation, well-typeset content sections, and clear service breakdowns. Built with " +
      "React.js and Tailwind CSS, it prioritises readability and a polished first impression.",
    goal:
      "Design a credibility-building product page that communicates the value of ERP services clearly, " +
      "maintains a professional enterprise aesthetic, and is easy to navigate on any device.",
    features: [
      "Dark-themed design with strong typographic hierarchy",
      "Multi-section layout: Hero, Features, How It Works, CTA",
      "Fully responsive across mobile, tablet and desktop",
      "Smooth transitions, hover states and prominent CTAs",
    ],
    tech:   ["React.js", "Tailwind CSS", "JavaScript", "Vercel"],
    role:
      "Sole developer — designed the dark theme system, built all page sections as React components, " +
      "implemented responsive Tailwind layouts, and deployed the project to Vercel.",
    tags: [
      { name: "react",    color: "blue-text-gradient"  },
      { name: "tailwind", color: "green-text-gradient" },
      { name: "ui/ux",    color: "cyan-text-gradient"  },
    ],
    screenshot:       "/projects/erp-pathway.jpg",
    live_demo_link:   "https://erp-pathway.vercel.app/",
    source_code_link: "https://github.com/WasayWithCode",
  },

  /* ─── 5. E-commerce Website Design ───────────────── */
  {
    slug:        "ecommerce",
    name:        "E-commerce Website Design",
    tagline:     "Pixel-perfect storefront UI with cart interactions.",
    description: "A pixel-perfect e-commerce front-end with product listings, cart UI, and a fully responsive layout demonstrating modern CSS and JavaScript techniques.",
    overview:
      "This e-commerce front-end project demonstrates a fully functional storefront interface built " +
      "without any framework — pure HTML, CSS, and JavaScript. It includes a product listing grid, " +
      "individual product cards with hover effects, and an interactive cart UI that updates dynamically. " +
      "The project showcases deep CSS skills and vanilla JS DOM manipulation at a production-ready level.",
    goal:
      "Demonstrate proficiency in vanilla HTML/CSS/JS by building a realistic e-commerce UI with " +
      "interactive cart functionality, responsive grid layouts, and polished visual design — " +
      "without relying on any library or framework.",
    features: [
      "Product listing grid with responsive card layout",
      "Add-to-cart with live item count badge and cart sidebar",
      "Quantity controls, item removal and running total",
      "Zero dependencies — pure HTML, CSS and JavaScript",
    ],
    tech:   ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    role:
      "Sole developer — designed the entire UI system, implemented cart state management in vanilla JS, " +
      "built the responsive grid layout with pure CSS, and published to GitHub Pages.",
    tags: [
      { name: "html5",      color: "blue-text-gradient"  },
      { name: "css3",       color: "green-text-gradient" },
      { name: "javascript", color: "cyan-text-gradient"  },
    ],
    screenshot:       "/projects/ecommerce-design.jpg",
    live_demo_link:   "https://wasaywithcode.github.io/Website-Design-E-commerce/",
    source_code_link: "https://github.com/WasayWithCode/Website-Design-E-commerce",
  },
];

export { services, technologies, experiences, testimonials, projects };
