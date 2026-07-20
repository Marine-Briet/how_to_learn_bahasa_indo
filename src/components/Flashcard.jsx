import { categoryColor } from "../theme.js";

export default function Flashcard({ verbe, questionLang, flipped, onFlip }) {
  const accent = categoryColor(verbe.categorie);
  const questionText = questionLang === "fr" ? verbe.traduction.split(" / ")[0] : verbe.racine;
  const questionLabel = questionLang === "fr" ? "En français" : "Dalam bahasa Indonesia";
  const questionFlag = questionLang === "fr" ? "🇫🇷" : "🇮🇩";

  return (
    <div
      onClick={onFlip}
      style={{
        perspective: 1200,
        width: "100%",
        maxWidth: 420,
        height: 340,
        margin: "0 auto",
        cursor: "pointer",
      }}
      role="button"
      tabIndex={0}
      aria-label={flipped ? "Carte retournée, réponse visible" : "Carte face question, touche pour révéler la réponse"}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onFlip(); } }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.5s cubic-bezier(.4,.2,.2,1)",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FACE QUESTION */}
        <div style={{ ...faceStyle, background: "#FFFFFF", border: `1.5px solid ${accent}55` }}>
          <div className="kawung-pattern" />
          <span style={{ ...chipStyle, background: `${accent}18`, color: accent, border: `1px solid ${accent}55` }}>
            {verbe.categorie}
          </span>
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <div style={{ fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", color: "#6E7A93", marginBottom: 14 }}>
              {questionFlag} {questionLabel}
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 34, color: "#1B2A4A", lineHeight: 1.2 }}>
              {questionText}
            </div>
          </div>
          <div style={{ fontSize: 12.5, color: "#9AA3B8", zIndex: 1 }}>Touche la carte pour révéler ↴</div>
        </div>

        {/* FACE REPONSE */}
        <div style={{ ...faceStyle, background: "#F1EBDB", border: `1.5px solid ${accent}88`, transform: "rotateY(180deg)" }}>
          <div className="kawung-pattern" />
          <span style={{ ...chipStyle, background: `${accent}18`, color: accent, border: `1px solid ${accent}55` }}>
            {verbe.categorie}
          </span>
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 30, color: "#B8801F", marginBottom: 14 }}>
              {verbe.racine}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 16 }}>
              {verbe.formes.map((f) => (
                <span key={f} style={{
                  background: "#FFFFFF", border: "1px solid #E4DCC6", borderRadius: 8,
                  padding: "4px 10px", fontSize: 14, color: "#1B2A4A", fontWeight: 600,
                }}>
                  {f}
                </span>
              ))}
            </div>
            <div style={{ fontSize: 15, color: "#6E7A93", fontStyle: "italic" }}>🇫🇷 {verbe.traduction}</div>
          </div>
          <div style={{ fontSize: 12.5, color: "#9AA3B8", zIndex: 1 }}>Touche pour revenir à la question</div>
        </div>
      </div>
    </div>
  );
}

const faceStyle = {
  position: "absolute",
  inset: 0,
  borderRadius: 20,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "22px 24px",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
  overflow: "hidden",
};

const chipStyle = {
  alignSelf: "flex-start",
  borderRadius: 8,
  padding: "4px 10px",
  fontSize: 12,
  fontWeight: 700,
  zIndex: 1,
};