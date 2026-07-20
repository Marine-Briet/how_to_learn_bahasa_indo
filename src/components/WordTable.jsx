import { useMemo, useState } from "react";
import { verbes } from "../data/verbes.js";
import { COLORS, categoryColor } from "../theme.js";

const categories = [...new Set(verbes.map((v) => v.categorie))];

export default function WordTable({ onBack }) {
  const [search, setSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState(new Set(categories));

  const allSelected = activeCategories.size === categories.length;

  function toggleCategory(cat) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  function toggleAll() {
    setActiveCategories(allSelected ? new Set() : new Set(categories));
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return verbes.filter((v) => {
      if (!activeCategories.has(v.categorie)) return false;
      if (!q) return true;
      return (
        v.racine.toLowerCase().includes(q) ||
        v.traduction.toLowerCase().includes(q) ||
        v.formes.some((f) => f.toLowerCase().includes(q))
      );
    });
  }, [search, activeCategories]);

  return (
    <div style={{ minHeight: "100vh", padding: "20px 16px 40px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <button onClick={onBack} style={backButtonStyle}>← Retour</button>

        <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 26, color: COLORS.ink, margin: "10px 0 16px" }}>
          Tous les verbes
        </h1>

        <input
          type="text"
          placeholder="Rechercher en français ou en indonésien..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInputStyle}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "14px 0 8px" }}>
          <span style={{ fontSize: 13, color: COLORS.muted, fontWeight: 600 }}>Thématiques</span>
          <button onClick={toggleAll} style={selectAllButtonStyle}>
            {allSelected ? "Tout désélectionner" : "Tout sélectionner"}
          </button>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
          {categories.map((cat) => {
            const color = categoryColor(cat);
            const active = activeCategories.has(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 20,
                  border: `1.5px solid ${active ? color : COLORS.line}`,
                  background: active ? `${color}14` : "#FFFFFF",
                  color: active ? color : COLORS.muted,
                  fontWeight: active ? 700 : 500,
                  fontSize: 12.5,
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <p style={{ fontSize: 13, color: COLORS.muted, marginBottom: 14 }}>
          {filtered.length} verbe{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((v) => {
            const color = categoryColor(v.categorie);
            return (
              <div key={v.id} style={{
                background: "#FFFFFF", border: `1px solid ${COLORS.line}`, borderRadius: 12,
                padding: "12px 16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 17, color: COLORS.ink }}>
                    {v.racine}
                  </span>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color, background: `${color}14`,
                    border: `1px solid ${color}55`, borderRadius: 6, padding: "2px 8px", whiteSpace: "nowrap",
                  }}>
                    {v.categorie}
                  </span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
                  {v.formes.map((f) => (
                    <span key={f} style={{
                      background: COLORS.bgCardBack, borderRadius: 6, padding: "2px 8px",
                      fontSize: 13, color: COLORS.ink, fontWeight: 600,
                    }}>
                      {f}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: 14, color: COLORS.muted, fontStyle: "italic" }}>
                  🇫🇷 {v.traduction}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: COLORS.muted, padding: "24px 0" }}>
              Aucun verbe ne correspond à ta recherche.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const backButtonStyle = {
  background: "none",
  border: "none",
  color: COLORS.muted,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  padding: "8px 0",
};

const selectAllButtonStyle = {
  background: "none",
  border: "none",
  color: COLORS.gold,
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
  padding: "4px 0",
  textDecoration: "underline",
};

const searchInputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 12,
  border: `1.5px solid ${COLORS.line}`,
  fontSize: 16,
  outline: "none",
  boxSizing: "border-box",
  background: "#FFFFFF",
  color: COLORS.ink,
};