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
    image: "/images/projects/office.png",
  },
  "F&B": {
    location: "Dubai, UAE",
    year: "2024",
    scope: "Food & beverage",
    image: "/images/projects/retail.png",
  },
  Hospitality: {
    location: "Rabat, Morocco",
    year: "2026",
    scope: "Hospitality interior",
    image: "/images/projects/lobby.png",
  },
  Education: {
    location: "Sharjah, UAE",
    year: "2024",
    scope: "Learning environment",
    image: "/images/projects/office.png",
  },
  Residential: {
    location: "Dubai, UAE",
    year: "2025",
    scope: "Residential interior",
    image: "/images/projects/lobby.png",
  },
  Retail: {
    location: "Mumbai, India",
    year: "2026",
    scope: "Retail experience",
    image: "/images/projects/retail.png",
  },
  Product: {
    location: "Dubai, UAE",
    year: "2023",
    scope: "Product collaboration",
    image: "/images/projects/retail.png",
  },
};

const projectGroups: Record<ProjectCategory, Array<[string, string]>> = {
  Commercial: [
    ["93-white-case-doha", "White & Case Doha"],
    ["92-almabarrah-al-khalifia-foundation", "Almabarrah Al Khalifia Foundation"],
    ["88-global-management-consulting-firm", "Global Management Consulting Firm"],
    ["85-oliver-wyman-riyadh", "Oliver Wyman Riyadh"],
    ["83-ajman-rulers-court", "Ajman Ruler's Court"],
    ["79-dmcc-hq-dubai", "DMCC HQ, Dubai"],
    ["24-american-university-of-sharjah-research-technology-and-innovation-park", "AUS Research, Technology and Innovation Park"],
    ["71-supreme-council-of-motherhood-and-child", "Supreme Council of Motherhood and Child"],
    ["76-white-and-case", "White and Case"],
    ["86-difc-innovation-one-and-dubai-ai-campus", "DIFC Innovation One and Dubai AI Campus"],
    ["87-miza-m39", "Miza — M39"],
    ["78-eidos-studio", "EIDOS Studio"],
    ["72-oliver-wyman-abu-dhabi", "Oliver Wyman Abu Dhabi"],
    ["59-early-childhood-authority", "Early Childhood Authority"],
    ["67-niche", "Niche"],
    ["66-buliding-4-dubai-internet-city", "Building 4, Dubai Internet City"],
    ["52-mckinsey", "McKinsey"],
    ["1-takeda", "Takeda"],
    ["9-edelman-hq", "Edelman HQ"],
    ["10-edelman-dubai", "Edelman Dubai"],
  ],
  "F&B": [
    ["84-five-guys", "Five Guys"],
    ["73-here-o-donuts", "Here-O Donuts"],
    ["64-drop-abu-dhabi", "Drop Abu Dhabi"],
    ["34-drop-khawaneej", "Drop Khawaneej"],
    ["63-expo-restaurants", "Expo Restaurants"],
    ["20-mezza-house", "Mezza House"],
    ["19-al-rawi", "Al Rawi"],
    ["21-shababeek", "Shababeek"],
  ],
  Hospitality: [
    ["90-story-le-carrousel-rabat", "Story Le Carrousel Rabat"],
    ["94-bait-al-wasti", "Bait Al Wasti"],
    ["38-th8-palm-managed-by-ihg", "Th8 Palm, managed by IHG"],
    ["25-armed-forces-officers-club-hotel", "Armed Forces Officers Club & Hotel"],
    ["55-sensasia", "SensAsia"],
    ["47-paramount-sales-center", "Paramount Sales Center"],
  ],
  Education: [
    ["82-national-academy-for-childhood-development", "National Academy for Childhood Development"],
    ["8-ora-nursery-of-the-future", "ORA, Nursery of the Future"],
    ["14-sheraa-university-of-sharjah", "Sheraa, University of Sharjah"],
    ["13-sheraa-american-university-of-sharjah", "Sheraa, American University of Sharjah"],
    ["32-sharjah-english-school", "Sharjah English School"],
  ],
  Residential: [
    ["91-al-barari-villa", "Al Barari Villa"],
    ["96-residential-development", "Residential Development"],
    ["35-jumeirah-island-villa", "Jumeirah Island Villa"],
    ["97-lume-residences", "Lume Residences"],
    ["57-private-villa", "Private Villa"],
    ["61-bukhash-villa", "Bukhash Villa"],
    ["49-paramount-doha", "Paramount Doha"],
    ["7-soho-lofts-residential-tower", "SOHO Lofts Residential Tower"],
    ["17-kuwait-villa", "Kuwait Villa"],
    ["18-villa-d", "Villa D"],
    ["16-datwani-villa", "Datwani Villa"],
    ["15-marina-arcade-sales-suite", "Marina Arcade Sales Suite"],
  ],
  Retail: [
    ["95-jaipur-rugs-mumbai", "Jaipur Rugs Mumbai"],
    ["75-jaipur-rugs-dubai", "Jaipur Rugs Dubai"],
    ["80-sjp-by-sarah-jessica-parker", "SJP by Sarah Jessica Parker"],
    ["81-underground", "Underground"],
    ["74-bauhaus", "Bauhaus"],
    ["69-vintage-vaults", "Vintage Vaults"],
  ],
  Product: [
    ["39-artemide", "Artemide"],
    ["40-american-hardwood-export-council", "American Hardwood Export Council"],
    ["41-stellar-works", "Stellar Works"],
    ["42-preciosa", "Preciosa"],
    ["53-fbmi", "FBMI"],
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
  projects.find((project) => project.slug === "90-story-le-carrousel-rabat")!,
  projects.find((project) => project.slug === "95-jaipur-rugs-mumbai")!,
  projects.find((project) => project.slug === "93-white-case-doha")!,
];

export const awards = [
  {
    year: "2026",
    items: [
      "Interior Design Firm of the Year — Highly Commended",
      "Best Heritage & Adaptive Reuse Project — Bait Al Wasti",
      "Brands That Matter — EIDOS",
    ],
  },
  {
    year: "2025",
    items: [
      "International Workplace Designer of the Year — Pallavi Dean",
      "Best of EMEA — Ajman Ruler’s Court",
      "Medium Corporate Office — BCG",
    ],
  },
  {
    year: "2024",
    items: [
      "Interior Design of the Year — Underground Sport",
      "Commercial Office — Ajman Ruler’s Court",
      "Small Early Education — PIF Day Care Center",
    ],
  },
  {
    year: "2023",
    items: [
      "Pioneering Design Firm of the Year",
      "Office of the Year — DMCC",
      "Public Space — Jaipur Rugs",
    ],
  },
  {
    year: "2022",
    items: [
      "Interior Designer of the Year — Pallavi Dean",
      "Retail Interior of the Year — Vintage Vaults",
      "F&B Interior of the Year — Drop Coffee Abu Dhabi",
    ],
  },
  {
    year: "2021",
    items: [
      "Interior Design Boutique Firm of the Year",
      "Healthcare & Wellness Design of the Year — SensAsia",
      "Best of Year Interior Designer — Pallavi Dean",
    ],
  },
];

export const news = [
  ["Jun 2026", "‘People will always need touch’: Pallavi Dean on designing Jaipur Rugs’ Mumbai flagship"],
  ["Apr 2026", "Brick by Brick: architecture firms leading the way in the UAE and beyond"],
  ["Mar 2026", "Most influential women shaping the construction industry in 2026"],
  ["May 2025", "A Dubai headquarters that blends culture, nature and workplace innovation"],
  ["Jan 2025", "Global Management Consulting Firm: colour, calm and collaboration"],
  ["Oct 2024", "Ajman Ruler’s Court reimagines the civic workplace"],
];

export const research = [
  ["Mar 2025", "Designing Workplaces for Neurodivergent Adults", "The future of workplace design embraces the full spectrum of human thinking."],
  ["Jan 2021", "7 trends that will transform home design", "How domestic space continues to evolve around wellbeing, flexibility and connection."],
  ["Nov 2020", "The Middle East Office Design Toolkit", "A practical cheat sheet for a better, prettier and more efficient place of business."],
  ["Jun 2020", "Redesigning Dining", "What a new normal means for hospitality and the rituals around sharing food."],
  ["May 2020", "7 perspectives on education spaces", "Design ideas that can take classroom learning into a more inclusive future."],
];
