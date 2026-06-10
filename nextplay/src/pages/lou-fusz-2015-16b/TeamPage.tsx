import { useNavigate } from "react-router-dom";

export default function Team201516B() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", fontFamily: "'Barlow', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 20px" }}>
      <div style={{ width: "100%", maxWidth: 860, marginBottom: 40 }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase" }}>
          ← Back
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div style={{ width: 200, height: 4, background: "linear-gradient(90deg,#4169E1,#FFB81C)", borderRadius: 2, margin: "0 auto 28px" }} />
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: 5, textTransform: "uppercase", marginBottom: 10 }}>Lou Fusz Soccer</div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 52, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: -1, textTransform: "uppercase" }}>2015/16B <span style={{ color: "#4169E1" }}>Blue Star</span></h1>
      </div>

      {/* Tools grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 480 }}>

        {/* Germany Bio Generator */}
        <button
          onClick={() => navigate("/2015-16b/germany-bio")}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 12,
            padding: "24px 28px",
            textAlign: "left",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
        >
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 700, color: "#FFCC00", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
            🇩🇪 Germany 2026
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 4 }}>
            Germany Player Bio Card Generator
          </div>
          <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
            Create a 4K 16:9 player bio card for the Germany 2026 trip. Export as PNG to use as the opening 5 seconds of each player's video.
          </div>
        </button>

      </div>
    </div>
  );
}
