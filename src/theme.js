// Jetons de design de l'application.
// Palette inspirée du batik indonésien, en version claire : papier crème,
// indigo profond pour le texte, or (fil de songket) en accent.

export const COLORS = {
  bg: "#FAF6EC",
  bgCard: "#FFFFFF",
  bgCardBack: "#F1EBDB",
  ink: "#1B2A4A",
  gold: "#B8801F",
  goldSoft: "#DDB463",
  muted: "#6E7A93",
  line: "#E4DCC6",
  success: "#2E7D5B",
  danger: "#C74B2C",
};

// Une couleur d'accent distincte par thématique, choisie pour rester lisible
// en texte sur le fond crème des cartes.
export const CATEGORY_COLORS = {
  "Corps & Quotidien": "#C1701A",
  "Sens & Perception": "#8A3FC7",
  "Communication": "#1E7FB8",
  "Travail & Études": "#2E8B57",
  "Commerce": "#A88A00",
  "Déplacement": "#1A8C82",
  "Émotions & Relations": "#C23E6B",
  "Maison & Vie pratique": "#A15C3E",
  "Mental & Cognition": "#5B5FC7",
};

export function categoryColor(cat) {
  return CATEGORY_COLORS[cat] || COLORS.gold;
}