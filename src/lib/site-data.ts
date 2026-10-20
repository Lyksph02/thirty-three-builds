import savoy from "@/assets/savoy-48.jpg.asset.json";
import lgLofts from "@/assets/lg-lofts.jpg.asset.json";
import tioga from "@/assets/tioga-arms.jpg.asset.json";
import jmb from "@/assets/jmb-gardens.jpg.asset.json";
import legacy from "@/assets/legacy-wilkinsburg.jpg.asset.json";
import medical from "@/assets/medical-row.jpg.asset.json";
import bethel from "@/assets/bethel-village.jpg.asset.json";
import beacon from "@/assets/beacon-of-hope.jpg.asset.json";
import groundbreaking from "@/assets/groundbreaking.jpg.asset.json";
import groundbreakingTeam from "@/assets/groundbreaking-team.jpg.asset.json";
import hero from "@/assets/hero-construction.jpg.asset.json";
import team from "@/assets/team.jpg.asset.json";
const logoDark = "/images/3t-logo.png";
const logoLight = "/images/3t-logo.png";

/**
 * Single source of truth for company facts.
 * All content is taken from the3tgroup.com. Items marked `needsConfirmation`
 * should be verified by 3T before launch.
 */
export const company = {
  name: "3T Construction Group",
  legalName: "3T Construction Group, LLC",
  description:
    "A real estate development firm specializing in affordable and market-rate housing, construction management, and public-private partnerships.",
  email: "info@the3tgroup.com",
  address: { street: "213 Smithfield St", city: "Pittsburgh", region: "PA", postal: "15222" },
  instagram: "https://www.instagram.com/ryansanders_vc/",
  founder: "Ryan Sanders",
  calendly: "https://calendly.com/lykamaysaavedra02/30min",
};

export const images = { 
  hero: "/images/herosec", 
  groundbreaking: "/images/ryan-sanders.jpg", 
  groundbreakingTeam: "/images/bretz-court.png", 
  team: "/images/ryan-sanders.jpg", 
  logoDark: "/images/3t-logo.png", 
  logoLight: "/images/3t-logo.png" 
};

export const metrics = [
  { value: 15, suffix: "+", prefix: "", label: "Years of real estate development experience" },
  { value: 200, suffix: "+", prefix: "", label: "Units of affordable housing delivered" },
  { value: 30, suffix: "+", prefix: "", label: "Construction management projects completed" },
  { value: 60, suffix: "M+", prefix: "$", label: "In mixed-solution developments" },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  items: string[];
};

export const services: Service[] = [
  {
    slug: "affordable-housing-development",
    title: "Affordable Housing Development",
    short: "Planning, design and construction management for financially accessible housing.",
    description:
      "We design and execute each project to create quality developments that are financially accessible — driven by the belief that everyone deserves a place to call home.",
    items: ["Project planning and design", "Construction management", "Financial consulting"],
  },
  {
    slug: "public-private-partnerships",
    title: "Public-Private Partnerships",
    short: "Government relations and stakeholder coordination that keep complex projects moving.",
    description:
      "With deep roots in public policy, we liaise between our clients and government entities, advocating for outcomes that align with project goals and broader community interests.",
    items: ["Community development", "Public affairs and stakeholder engagement", "Media services"],
  },
  {
    slug: "development-consulting",
    title: "Development & Real Estate Consulting",
    short: "Feasibility, investment strategy and compliance support for public and private entities.",
    description:
      "We share our expertise in affordable housing, real estate development and government relations with public and private organizations evaluating or advancing a development.",
    items: ["4% & 9% LIHTC feasibility analysis", "Market and investment strategy", "Grant support and compliance"],
  },
];

export type Project = {
  slug: string;
  name: string;
  location: string;
  type: string;
  image?: string;
  featured?: boolean;
};

/** Names and locations from the existing portfolio. Roles, status and details pending 3T confirmation. */
export const projects: Project[] = [
  { slug: "savoy-48", name: "Savoy 48", location: "Harrisburg, PA", type: "Affordable Housing", image: "/images/savoy-48.jpg", featured: true },
  { slug: "jmb-gardens", name: "JMB Gardens", location: "Harrisburg, PA", type: "Affordable Housing", image: "/images/jmb-gardens.jpg", featured: true },
  { slug: "beacon-of-hope", name: "Beacon of Hope", location: "Philadelphia, PA", type: "Residential Development", image: "/images/beacon-of-hope.jpg", featured: true },
  { slug: "lg-lofts", name: "LG Lofts", location: "New Castle, PA", type: "Residential Development", image: "/images/lg-lofts.jpg", featured: true },
  { slug: "bethel-village", name: "Bethel Village", location: "Harrisburg, PA", type: "Affordable Housing", image: "/images/bethel-village.jpg", featured: true },
  { slug: "tioga-arms", name: "Tioga Arms", location: "Philadelphia, PA", type: "Residential Development", image: "/images/tioga-arms.jpg", featured: true },
  { slug: "legacy-wilkinsburg", name: "Legacy – Wilkinsburg", location: "Wilkinsburg, PA", type: "Residential Development", image: "/images/legacy-wilkinsburg.jpg" },
  { slug: "medical-row-apartments", name: "Medical Row Apartments", location: "York, PA", type: "Residential Development", image: "/images/medical-row-apartment.jpg" },
  { slug: "bretz-court", name: "Bretz Court", location: "Location pending confirmation", type: "Residential Development", image: "/images/bretz-court.jpg" },
  { slug: "bailey-street-townhomes", name: "Bailey Street Townhomes", location: "Location pending confirmation", type: "Residential Development", image: "/images/herosec" },
];

export const projectTypes = ["All", "Affordable Housing", "Residential Development"] as const;

export type NewsItem = { title: string; date: string; iso: string; summary: string; url: string; project?: string };

export const news: NewsItem[] = [
  {
    title: "Bethel Village Ground Break",
    date: "August 23, 2023",
    iso: "2023-08-23",
    summary: "Groundbreaking for Bethel Village, an affordable housing development in Harrisburg.",
    url: "https://www.the3tgroup.com/post/bethel-village-ground-break",
    project: "bethel-village",
  },
  {
    title: "LeSean McCoy's multi-million dollar Harrisburg housing complex breaking ground",
    date: "June 9, 2023",
    iso: "2023-06-09",
    summary: "Coverage of the groundbreaking for a new multi-million dollar housing complex in Harrisburg.",
    url: "https://www.the3tgroup.com/post/lesean-mccoys-multi-million-dollar-harrisburg-housing-complex-breaking-ground",
  },
  {
    title: "LeSean McCoy swaps tackles for bricks, brings affordable housing to Harrisburg hometown",
    date: "May 27, 2023",
    iso: "2023-05-27",
    summary: "A look at a new affordable housing effort in Harrisburg and the partners behind it.",
    url: "https://www.the3tgroup.com/post/lesean-mccoy-swaps-tackles-for-bricks-brings-affordable-housing-to-harrisburg-hometown",
  },
  {
    title: "Harrisburg developer proposes affordable housing project in Allison Hill",
    date: "March 1, 2023",
    iso: "2023-03-01",
    summary: "Reporting on a proposed affordable housing development in Harrisburg's Allison Hill neighborhood.",
    url: "https://www.the3tgroup.com/post/harrisburg-developer-proposes-affordable-housing-project-in-allison-hill",
  },
];

export const partnerTypes = ["Government entities", "Nonprofit organizations", "Private firms", "Municipal partners", "Design & engineering firms", "Capital partners"];

export const approach = [
  { title: "Understand", body: "Establish the project's goals, needs and constraints." },
  { title: "Evaluate", body: "Assess feasibility, stakeholders and development considerations." },
  { title: "Plan", body: "Coordinate planning, financial considerations and project requirements." },
  { title: "Execute", body: "Support development and construction management within the agreed scope." },
  { title: "Deliver", body: "Work toward the intended outcomes and long-term community value." },
];

export const navLinks = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
] as const;
