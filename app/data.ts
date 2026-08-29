/**
 * PLACEHOLDER CONTENT
 *
 * Every entry below is invented filler so the layouts have something to
 * render. None of it describes real EIDOS work, clients, awards or press.
 * Replace it before the site is shown to clients or made public.
 *
 * The exported shapes must stay as they are — the pages read these types
 * directly.
 */

export type ProjectCategory =
  | "Commercial"
  | "F&B"
  | "Hospitality"
  | "Education"
  | "Residential"
  | "Retail"
  | "Product";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  scope: string;
  image: string;
};

const defaults: Record<ProjectCategory, Omit<Project, "slug" | "title" | "category">> = {
  Commercial: {
    location: "Dubai, UAE",
    year: "2025",
    scope: "Workplace interior",
    image: "/images/projects/office.webp",
  },
  "F&B": {
    location: "Dubai, UAE",
    year: "2024",
    scope: "Food & beverage",
    image: "/images/projects/retail.webp",
  },
  Hospitality: {
    location: "Dubai, UAE",
    year: "2026",
    scope: "Hospitality interior",
    image: "/images/projects/lobby.webp",
  },
  Education: {
    location: "Sharjah, UAE",
    year: "2024",
    scope: "Learning environment",
    image: "/images/projects/lobby.webp",
  },
  Residential: {
    location: "Dubai, UAE",
    year: "2025",
    scope: "Private residence",
    image: "/images/projects/lobby.webp",
  },
  Retail: {
    location: "Dubai, UAE",
    year: "2026",
    scope: "Retail interior",
    image: "/images/projects/retail.webp",
  },
  Product: {
    location: "Dubai, UAE",
    year: "2023",
    scope: "Product collaboration",
    image: "/images/projects/retail.webp",
  },
};

// Generic descriptors only — no real client or project names.
const projectGroups: Record<ProjectCategory, Array<[string, string]>> = {
  Commercial: [
    ["commercial-01", "Workplace — Business Bay"],
    ["commercial-02", "Head Office — DIFC"],
    ["commercial-03", "Consultancy Fit-Out"],
    ["commercial-04", "Corporate Floor — Riyadh"],
    ["commercial-05", "Innovation Hub"],
    ["commercial-06", "Regional Headquarters"],
  ],
  "F&B": [
    ["fnb-01", "Speciality Coffee Bar"],
    ["fnb-02", "All-Day Dining"],
    ["fnb-03", "Dessert Concept"],
    ["fnb-04", "Waterfront Restaurant"],
  ],
  Hospitality: [
    ["hospitality-01", "Boutique Hotel Lobby"],
    ["hospitality-02", "Resort Public Areas"],
    ["hospitality-03", "Spa & Wellness Suite"],
    ["hospitality-04", "Heritage Guest House"],
  ],
  Education: [
    ["education-01", "Early Years Centre"],
    ["education-02", "University Study Commons"],
    ["education-03", "STEM Learning Lab"],
  ],
  Residential: [
    ["residential-01", "Private Villa"],
    ["residential-02", "Penthouse Apartment"],
    ["residential-03", "Townhouse Renovation"],
    ["residential-04", "Show Apartment"],
  ],
  Retail: [
    ["retail-01", "Flagship Showroom"],
    ["retail-02", "Concept Store"],
    ["retail-03", "Pop-Up Installation"],
  ],
  Product: [
    ["product-01", "Lighting Collection"],
    ["product-02", "Seating Study"],
    ["product-03", "Material Collaboration"],
  ],
};

export const projects: Project[] = Object.entries(projectGroups).flatMap(
  ([category, items]) =>
    items.map(([slug, title], index) => ({
      slug,
      title,
      category: category as ProjectCategory,
      ...defaults[category as ProjectCategory],
      year: String(Number(defaults[category as ProjectCategory].year) - (index % 5)),
    })),
);

export const featuredProjects = [
  projects.find((project) => project.slug === "hospitality-01")!,
  projects.find((project) => project.slug === "retail-01")!,
  projects.find((project) => project.slug === "commercial-01")!,
];

// Placeholder award text — no real awards, people or organisations.
export const awards = [
  {
    year: "2026",
    items: [
      "Award placeholder — category one",
      "Award placeholder — category two",
      "Award placeholder — category three",
    ],
  },
  {
    year: "2025",
    items: [
      "Award placeholder — category one",
      "Award placeholder — category two",
      "Award placeholder — category three",
    ],
  },
  {
    year: "2024",
    items: [
      "Award placeholder — category one",
      "Award placeholder — category two",
    ],
  },
];

// Placeholder press headlines — no real publications, people or quotes.
export const news = [
  ["Jun 2026", "Press headline placeholder — studio feature"],
  ["Apr 2026", "Press headline placeholder — project profile"],
  ["Mar 2026", "Press headline placeholder — industry comment"],
  ["May 2025", "Press headline placeholder — workplace design"],
  ["Jan 2025", "Press headline placeholder — retail interiors"],
  ["Oct 2024", "Press headline placeholder — civic project"],
];

// Placeholder research entries.
export const research = [
  ["Mar 2025", "Research placeholder — workplace", "Short description of the piece goes here."],
  ["Jan 2025", "Research placeholder — residential", "Short description of the piece goes here."],
  ["Nov 2024", "Research placeholder — materials", "Short description of the piece goes here."],
  ["Jun 2024", "Research placeholder — hospitality", "Short description of the piece goes here."],
  ["May 2024", "Research placeholder — education", "Short description of the piece goes here."],
];
