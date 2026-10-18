/**
 * Project content. Every technology, feature and link below was checked against
 * the public repositories at github.com/dan-g-dev (source code + READMEs).
 *
 * Rules kept here:
 *  - `live` is set only where the repository README publishes a deployment.
 *    Projects without a live URL simply have no live-demo button.
 *  - `image` points at a screenshot in public/projects/ (cropped from the
 *    full-page screenshots supplied by Daniel). Projects without `image`
 *    show a labelled placeholder instead.
 *  - Features describe what the code implements today, with limitations listed
 *    honestly under `notes`.
 */
export interface TechGroup {
  label: string;
  items: readonly string[];
}

export interface Project {
  id: string;
  title: string;
  /** Native-script brand name shown beside the title. */
  nativeName?: string;
  category: string;
  tagline: string;
  description: string;
  /** Larger presentation in the gallery. */
  featured?: boolean;
  /** Short list of chips shown on the gallery row. */
  technologies: readonly string[];
  /** Full stack, grouped, shown in the detail view. */
  stack: readonly TechGroup[];
  features: readonly string[];
  implementation: readonly string[];
  /** Honest status / limitations. */
  notes: readonly string[];
  github: string;
  live?: string;
  image?: { src: string; alt: string; width: number; height: number };
}

export const PROJECTS: readonly Project[] = [
  {
    id: "shegerflix",
    title: "ShegerFlix",
    category: "Entertainment / Full-Stack",
    tagline: "Ethiopia's home for stories.",
    description:
      "A movie and series discovery platform focused on Ethiopian content, built with a React frontend and a Node.js, Express, and MySQL backend. The application brings browsing, personal watchlists, viewing history, and content administration into one experience.",
    featured: true,
    technologies: ["React", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MySQL", "JWT"],
    stack: [
      { label: "Frontend", items: ["React 18", "Vite", "React Router", "Tailwind CSS", "Axios"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST API", "express-validator"] },
      { label: "Database", items: ["MySQL (mysql2)"] },
      { label: "Auth and security", items: ["JWT", "bcrypt", "Role-based authorization"] },
    ],
    features: [
      "Home page with a featured hero and rows such as Popular in Ethiopia, Ethiopian Movies, and Ethiopian Series.",
      "Search, plus filtering by type, language, and genre.",
      "Title detail pages with poster, synopsis, genres, and rating.",
      "Registration and login with JWT authentication.",
      "Personal My List: add and remove titles.",
      "Watch history, recorded when a visitor presses Play.",
      "Admin dashboard to create, edit, and delete titles, assign genres, and view users.",
    ],
    implementation: [
      "A React single-page app talks to an Express REST API, which reads and writes a MySQL database of six related tables, including a many-to-many link between titles and genres.",
      "Passwords are hashed with bcrypt and the server signs a JWT on login. An Axios interceptor attaches the token to every request.",
      "Roles are enforced on the server: protected routes require authentication and admin routes require the admin role, while the frontend redirects signed-out visitors to the login page.",
    ],
    notes: [
      "There is no video player yet. Play records a title in the watch history rather than streaming a video.",
      "No automated tests yet.",
    ],
    github: "https://github.com/dan-g-dev/Shegerflix",
    live: "https://shegerflix.vercel.app",
    image: {
      src: "projects/shegerflix.webp",
      alt: "ShegerFlix home page: a featured film banner with Play and More Info buttons above a row of Ethiopian movie posters under Popular in Ethiopia.",
      width: 1343,
      height: 839,
    },
  },
  {
    id: "abe-auto-garage",
    title: "Abe Auto Garage",
    category: "Business Management / Full-Stack",
    tagline: "Bringing garage operations into one system.",
    description:
      "A garage management application designed to organize customers, vehicles, services, employees, and repair orders. It combines a React interface with an Express REST API and MySQL database to support everyday business workflows.",
    technologies: ["React", "Bootstrap", "Node.js", "Express.js", "MySQL", "JWT", "bcrypt"],
    stack: [
      { label: "Frontend", items: ["React", "Vite", "React Router", "React-Bootstrap"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST API"] },
      { label: "Database", items: ["MySQL (mysql2)"] },
      { label: "Auth and security", items: ["JWT", "bcrypt", "Role-based access"] },
    ],
    features: [
      "Employee login with JWT authentication.",
      "Three employee roles (Employee, Manager, Admin), with pages guarded by role in the interface and admin checks on the API.",
      "Customer management: add, edit, search, and view customer details.",
      "Vehicle records linked to customers.",
      "Service catalogue management.",
      "Employee management: add, edit, and remove staff.",
      "Repair orders that combine a customer, a vehicle, and services, with per-service completion tracking.",
      "A public order-tracking page where a customer can look up an order with its order hash.",
    ],
    implementation: [
      "The backend is layered into routes, controllers, and services, with SQL kept in the service layer and a database schema that includes customers, vehicles, employees, roles, services, and orders.",
      "Authentication middleware verifies the JWT on each protected request and checks the employee's company role before admin actions.",
      "The React frontend uses route guards so only the allowed roles can open each admin page.",
    ],
    notes: [],
    github: "https://github.com/dan-g-dev/abe-auto-garage-app",
    live: "https://abe-auto-garage-app-five.vercel.app",
    image: {
      src: "projects/abe-auto-garage.webp",
      alt: "Abe Auto Garage website: navigation bar and a workshop hero banner with a headline and an intro video button.",
      width: 973,
      height: 608,
    },
  },
  {
    id: "gulit-market",
    title: "Gulit Market",
    nativeName: "ጉሊት ገበያ",
    category: "E-commerce / Marketplace",
    tagline: "A marketplace with Ethiopia in mind.",
    description:
      "An Ethiopian-focused marketplace experience designed to help people discover products and connect with sellers. The application brings together product discovery, search, shopping, and seller workflows in a locally relevant shopping experience.",
    featured: true,
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MySQL", "JWT"],
    stack: [
      { label: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS", "Motion"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST API"] },
      { label: "Database", items: ["MySQL (mysql2)", "Schema and seed scripts"] },
      { label: "Auth and security", items: ["JWT", "bcryptjs", "Role-based access"] },
    ],
    features: [
      "Listings loaded from the API, with search and category, location, price, and condition filters.",
      "Product detail view and an order tracker.",
      "Sign-in and registration with JWT sessions.",
      "Cart and wishlist saved per user on the server.",
      "Checkout that creates real orders, with totals calculated on the server and a flat delivery fee.",
      "Seller dashboard: listings, orders, offers, and store profile.",
      "Admin dashboard: reports, user management, listing moderation, orders, and categories.",
      "English and Amharic interface text.",
    ],
    implementation: [
      "Payments go through a provider abstraction on the backend. Cash on Delivery is the working payment method, and the order stays pending until delivery.",
      "TeleBirr is wired in but not configured: the backend returns a clear error instead of faking a successful payment. CBE Birr and card payments are shown as unavailable.",
      "Separate seller and admin dashboards sit on top of role-aware API routes for listings, orders, offers, and categories.",
    ],
    notes: [
      "No real online payment provider is connected. Cash on Delivery is the only completed payment flow.",
      "Listing images are plain URLs; there is no image upload yet.",
      "Delivery is a flat fee, not distance-based.",
    ],
    github: "https://github.com/dan-g-dev/gulit-market",
    live: "https://gulit-market-pink.vercel.app",
    image: {
      src: "projects/gulit-market.webp",
      alt: "Gulit Market home page: navigation, a search bar over a street-market photo, category shortcuts, and the first row of product listings.",
      width: 1358,
      height: 849,
    },
  },
  {
    id: "taskforge",
    title: "TaskForge",
    category: "Productivity / Project Management",
    tagline: "From scattered tasks to structured teamwork.",
    description:
      "A project and team management platform designed to organize projects, assign tasks, track progress, and support collaboration. Its goal is to bring task workflows and project visibility into one clear workspace.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "dnd-kit", "Node.js", "Express.js", "MySQL"],
    stack: [
      { label: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS", "React Router", "dnd-kit", "Axios"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST API", "Multer (file uploads)"] },
      { label: "Database", items: ["MySQL (mysql2)"] },
      { label: "Auth and security", items: ["JWT", "bcrypt", "Role-based access control"] },
    ],
    features: [
      "Dashboard with project and task totals, completed and overdue counts, and a personal task list.",
      "Project creation and management, with members.",
      "Tasks with a title, description, assignee, due date, status, and priority.",
      "Kanban board with drag-and-drop; status changes are saved to the backend.",
      "Comments, file attachments, and an activity history on each task.",
      "Notifications.",
      "Teams and organization administration, including user roles.",
    ],
    implementation: [
      "Three roles (Admin, Manager, Developer) are enforced by server-side middleware, so permissions do not depend on the interface hiding buttons.",
      "Data is scoped by organization, so one organization's projects and tasks are not returned to another.",
      "Dropping a card on another column sends a status update to the API, and an activity log records changes.",
    ],
    notes: [
      "No automated test suite yet.",
      "Uploaded files are stored on the server's local disk, which suits a demo more than a multi-server deployment.",
      "No email verification or password reset yet.",
    ],
    github: "https://github.com/dan-g-dev/taskforge",
    live: "https://taskforge-ashy-nine.vercel.app",
    image: {
      src: "projects/taskforge.webp",
      alt: "TaskForge landing page: the headline Project management software built for increased productivity, with Sign up now and Request demo buttons.",
      width: 768,
      height: 480,
    },
  },
  {
    id: "hirehub-ethiopia",
    title: "HireHub Ethiopia",
    category: "Career Technology / Job Platform",
    tagline: "Connecting talent with opportunity.",
    description:
      "A job and internship platform focused on helping Ethiopian job seekers discover opportunities and helping employers manage applications. It brings job discovery and recruitment workflows together, with CV-to-job match scoring that uses Google Gemini when an API key is configured and a rule-based score otherwise.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MySQL", "Google Gemini API"],
    stack: [
      { label: "Frontend", items: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "React Router", "Axios"] },
      { label: "Backend", items: ["Node.js", "Express.js", "TypeScript", "Multer", "pdf-parse", "Nodemailer"] },
      { label: "Database", items: ["MySQL (mysql2)"] },
      { label: "Auth and security", items: ["JWT", "bcrypt", "Role-based access"] },
      { label: "AI", items: ["Google Gemini API (server-side only)"] },
    ],
    features: [
      "Job and internship listings with search and filters such as category, location, job type, and workplace type.",
      "Applications with a status timeline, and the option to withdraw an application.",
      "Saved jobs and a job seeker profile with PDF resume upload that is parsed to text.",
      "CV-to-job match score using Google Gemini, with a rule-based fallback.",
      "Notifications.",
      "Employer tools: company profile, job posting, and an applicants view with status updates.",
      "Admin tools: platform statistics, user management, company approval, and job moderation.",
    ],
    implementation: [
      "The API checks the user's role from the JWT on every protected route instead of trusting the frontend.",
      "MySQL tables are related with foreign keys, and job skills and an application's status timeline are stored as JSON columns. All SQL uses parameterized queries.",
      "The Gemini key stays on the server. When no key is configured, the backend falls back to a simple skill-overlap matcher rather than failing.",
    ],
    notes: [
      "Without a Gemini API key, matching uses the simpler rule-based score.",
      "Without email credentials, notification emails are logged instead of sent.",
      "No automated tests yet.",
    ],
    github: "https://github.com/dan-g-dev/hirehub",
    live: "https://hirehub-livid-omega.vercel.app",
    image: {
      src: "projects/hirehub-ethiopia.webp",
      alt: "HireHub Ethiopia home page: navigation, the headline Find Your Next Opportunity, and a job search bar with a location selector and popular searches.",
      width: 832,
      height: 520,
    },
  },
];
