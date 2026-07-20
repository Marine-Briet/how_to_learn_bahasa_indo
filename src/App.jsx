import { useMemo, useState } from "react";
import { verbes } from "./data/verbes.js";
import { COLORS, categoryColor } from "./theme.js";
import { shuffle } from "./utils.js";
import Flashcard from "./components/Flashcard.jsx";
import WordTable from "./components/WordTable.jsx";

const categories = [...new Set(verbes.map((v) => v.categorie))];

export default function App() {
  const [screen, setScreen] = useState("setup"); // "setup" | "session" | "table"
  const [selected, setSelected] = useState(new Set(categories)); // toutes cochées par défaut
  const [direction, setDirection] = useState("mixed"); // "fr" | "id" | "mixed"
  const [deck, setDeck] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [questionLang, setQuestionLang] = useState("fr");
  const [round, setRound] = useState(1);

  const allSelected = selected.size === categories.length;

  function pickQuestionLang() {
    if (direction === "fr") return "fr";
    if (direction === "id") return "id";
    return Math.random() < 0.5 ? "fr" : "id";
  }

  const pool = useMemo(
    () => verbes.filter((v) => selected.has(v.categorie)),
    [selected]
  );

  function toggleCategory(cat) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(categories));
  }

  function startSession() {
    setDeck(shuffle(pool));
    setIndex(0);
    setRound(1);
    setFlipped(false);
    setQuestionLang(pickQuestionLang());
    setScreen("session");
  }

  function nextCard() {
    let nextIndex = index + 1;
    let nextDeck = deck;
    let nextRound = round;
    if (nextIndex >= deck.length) {
      nextDeck = shuffle(pool);
      nextIndex = 0;
      nextRound = round + 1;
    }
    setDeck(nextDeck);
    setIndex(nextIndex);
    setRound(nextRound);
    setFlipped(false);
    setQuestionLang(pickQuestionLang());
  }

  if (screen === "table") {
    return <WordTable onBack={() => setScreen("setup")} />;
  }

  if (screen === "setup") {
    return (
      <SetupScreen
        selected={selected}
        toggleCategory={toggleCategory}
        allSelected={allSelected}
        toggleAll={toggleAll}
        poolSize={pool.length}
        direction={direction}
        setDirection={setDirection}
        onStart={startSession}
        onOpenTable={() => setScreen("table")}
      />
    );
  }

  const current = deck[index];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "20px 16px 32px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 480, margin: "0 auto", width: "100%" }}>
        <button onClick={() => setScreen("setup")} style={backButtonStyle}>
          ← Thématiques
        </button>
        <div style={{ fontSize: 13, color: COLORS.muted, fontWeight: 600 }}>
          Carte {index + 1} / {deck.length}
          {round > 1 && <span style={{ color: COLORS.gold }}> · Tour {round}</span>}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24, maxWidth: 480, margin: "0 auto", width: "100%" }}>
        {current && (
          <Flashcard
            verbe={current}
            questionLang={questionLang}
            flipped={flipped}
            onFlip={() => setFlipped((f) => !f)}
          />
        )}

        <button
          onClick={nextCard}
          style={{
            alignSelf: "center",
            background: COLORS.gold,
            color: "#FFFFFF",
            border: "none",
            borderRadius: 14,
            padding: "13px 32px",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(184,128,31,0.25)",
          }}
        >
          Carte suivante →
        </button>
      </div>
    </div>
  );
}

function SetupScreen({ selected, toggleCategory, allSelected, toggleAll, poolSize, direction, setDirection, onStart, onOpenTable }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 20px 32px" }}>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: COLORS.gold, fontWeight: 700, marginBottom: 8 }}>
          Kartu Bahasa
        </div>
        <h1 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 32, color: COLORS.ink }}>
          100 Verbes Indonésiens
        </h1>
        <p style={{ margin: "10px 0 0", color: COLORS.muted, fontSize: 14.5, maxWidth: 320 }}>
          Choisis une ou plusieurs thématiques, puis révise à voix haute — la carte te donne le mot dans une langue, à toi de trouver l'autre.
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: 460, display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button onClick={toggleAll} style={selectAllButtonStyle}>
          {allSelected ? "Tout désélectionner" : "Tout sélectionner"}
        </button>
      </div>

      <div style={{ width: "100%", maxWidth: 460, display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        {categories.map((cat) => (
          <CategoryChip
            key={cat}
            label={cat}
            active={selected.has(cat)}
            color={categoryColor(cat)}
            onClick={() => toggleCategory(cat)}
          />
        ))}
      </div>

      <div style={{ width: "100%", maxWidth: 460, marginBottom: 28 }}>
        <div style={{ fontSize: 13, color: COLORS.muted, fontWeight: 600, marginBottom: 8 }}>Sens de la carte</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <DirectionOption label="🇫🇷 → 🇮🇩" value="fr" direction={direction} setDirection={setDirection} />
          <DirectionOption label="🇮🇩 → 🇫🇷" value="id" direction={direction} setDirection={setDirection} />
          <DirectionOption label="🔀 Mélangé" value="mixed" direction={direction} setDirection={setDirection} />
        </div>
      </div>

      <button
        onClick={onStart}
        disabled={poolSize === 0}
        style={{
          background: poolSize === 0 ? COLORS.line : COLORS.gold,
          color: "#FFFFFF",
          border: "none",
          borderRadius: 16,
          padding: "16px 40px",
          fontSize: 16,
          fontWeight: 800,
          cursor: poolSize === 0 ? "not-allowed" : "pointer",
          boxShadow: poolSize === 0 ? "none" : "0 10px 26px rgba(184,128,31,0.3)",
        }}
      >
        {poolSize === 0 ? "Choisis au moins une thématique" : `Commencer (${poolSize} verbe${poolSize > 1 ? "s" : ""})`}
      </button>

      <button onClick={onOpenTable} style={tableButtonStyle}>
        📋 Voir tous les mots
      </button>
    </div>
  );
}

function DirectionOption({ label, value, direction, setDirection }) {
  const active = direction === value;
  return (
    <button
      onClick={() => setDirection(value)}
      style={{
        flex: 1,
        minWidth: 96,
        padding: "12px 10px",
        borderRadius: 12,
        border: `1.5px solid ${active ? COLORS.gold : COLORS.line}`,
        background: active ? `${COLORS.gold}14` : "#FFFFFF",
        color: active ? COLORS.gold : COLORS.ink,
        fontSize: 13.5,
        fontWeight: active ? 700 : 500,
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      {label}
    </button>
  );
}

function CategoryChip({ label, active, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        textAlign: "left",
        background: active ? `${color}14` : "#FFFFFF",
        border: `1.5px solid ${active ? color : COLORS.line}`,
        color: active ? color : COLORS.ink,
        borderRadius: 12,
        padding: "13px 18px",
        fontSize: 15,
        fontWeight: active ? 700 : 500,
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      <span style={{
        width: 18, height: 18, borderRadius: 5, flexShrink: 0,
        border: `1.5px solid ${active ? color : COLORS.line}`,
        background: active ? color : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#FFFFFF", fontSize: 12, fontWeight: 900,
      }}>
        {active ? "✓" : ""}
      </span>
      {label}
    </button>
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

const tableButtonStyle = {
  marginTop: 14,
  background: "none",
  border: `1.5px solid ${COLORS.line}`,
  color: COLORS.ink,
  borderRadius: 12,
  padding: "10px 24px",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};