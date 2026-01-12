export const BRANDS = {
  MATRIX: {
    name: "MATRIX",
    type: "The Architect",
    id: "matrix",
    segment: "Parent Company",
    tagline: "Systems of form, utility, and future craft.",
    summary:
      "The parent house that unifies every expression under one design philosophy: precision, restraint, and engineered elegance.",
    audience: "Urban innovators, architects of modern life.",
    priceGuide: "By appointment",
    regions: ["New York", "Seoul", "Dubai"],
    signature: ["Precision tailoring", "Modular outerwear", "Research atelier"],
    accent: "#16a34a",
    hero: "image_b3599c.jpg"
  },
  AMERICAN_CLUB: {
    name: "The American Club",
    type: "The Estate",
    id: "american_club",
    segment: "Invitation-Only House",
    tagline: "Sovereign craft, discreetly appointed.",
    summary:
      "An invitation-only house for rare textiles, bespoke tailoring, and legacy pieces curated for an inner circle of patrons.",
    audience: "Patrons, collectors, and legacy families.",
    priceGuide: "Invitation only",
    regions: ["New York", "Paris", "Milan"],
    signature: ["Bespoke tailoring", "Rare textiles", "Legacy stewardship"],
    accent: "#002366",
    hero: "image_b356cf.jpg"
  },
  ALWAYS_WELL: {
    name: "Always Well India",
    type: "The Traveler",
    id: "always_well",
    segment: "Everyday India",
    tagline: "Everyday ease, elevated for India.",
    summary:
      "An everyday wardrobe with global standards, crafted for India with breathable materials and intuitive silhouettes.",
    audience: "Daily explorers, families, and modern professionals.",
    priceGuide: "Accessible luxury",
    regions: ["Mumbai", "Delhi", "Bengaluru"],
    signature: ["Travel-ready ease", "Artisan textiles", "Comfort engineering"],
    accent: "#8c4b37",
    hero: "image_b356d7.jpg"
  }
};

export const DEFAULT_BRAND_KEY = "MATRIX";

export const AI_WELCOME_KEY_BY_BRAND = {
  matrix: "ai_welcome_matrix",
  american_club: "ai_welcome_club",
  always_well: "ai_welcome_well"
};
