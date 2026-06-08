import { useNavigate } from "react-router-dom";

const TOOLS = [
  {
    path: "/2013ga/player-card",
    name: "Player Card Generator",
    description: "Build custom event cards for each player with photo, number, position & QR code schedule link.",
    icon: "🃏",
    available: true,
  },
];

export default function Team2013GA() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", fontFamily: "'Barlow', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 20px" }}>
      <div style={{ width: "100%", maxWidth: 860, marginBottom: 40 }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase", padding: 0 }}>
          ← NextPlay Ventures
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: 56, width: "100%", maxWidth: 860 }}>
        <div style={{ width: "100%", height: 4, background: "linear-gradient(90deg, #FFB81C, #4169E1)", borderRadius: 2, marginBottom: 28 }} />
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 700, color: "#FFB81C", letterSpacing: 5, textTransform: "uppercase", opacity: 0.7, marginBottom: 10 }}>Lou Fusz Soccer</div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 52, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: -1, textTransform: "uppercase" }}>
          2012/13G <span style={{ color: "#FFB81C" }}>GA Gold</span>
        </h1>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", maxWidth: 860, width: "100%" }}>
        {TOOLS.map((tool) => (
          <div key={tool.path} onClick={() => tool.available && navigate(tool.path)}
            style={{ width: 280, cursor: tool.available ? "pointer" : "default", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,184,28,0.15)", borderRadius: 14, padding: 28, opacity: tool.available ? 1 : 0.5, transition: "transform 0.15s, border-color 0.15s, box-shadow 0.15s", position: "relative", overflow: "hidden" }}
            onMouseEnter={e => { if (!tool.available) return; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,184,28,0.45)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,184,28,0.15)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #FFB81C, #4169E1)" }} />
            <div style={{ fontSize: 32, marginBottom: 14 }}>{tool.icon}</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>{tool.name}</div>
            <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{tool.description}</div>
            {tool.available && <div style={{ marginTop: 20, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 700, color: "#FFB81C", letterSpacing: 2, textTransform: "uppercase" }}>Open Tool →</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
