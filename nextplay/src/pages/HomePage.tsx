import { useNavigate } from "react-router-dom";

const TEAMS = [
  {
    path: "/2011-12g",
    name: "Lou Fusz",
    division: "2011/12G GA White",
    color: "#e8e8e8",
    accent: "#4169E1",
    tools: 0,
  },
  {
    path: "/2013ga",
    name: "Lou Fusz",
    division: "2012/13G GA Gold",
    color: "#FFB81C",
    accent: "#4169E1",
    tools: 1,
  },
  {
    path: "/2015-16b",
    name: "Lou Fusz",
    division: "2015/16B Blue Star",
    color: "#4169E1",
    accent: "#FFB81C",
    tools: 1,
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh", background: "#050d1a",
      fontFamily: "'Barlow', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "60px 20px"
    }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, fontWeight: 700, color: "#FFB81C", letterSpacing: 5, textTransform: "uppercase", opacity: 0.7, marginBottom: 12 }}>
          Soccer Tools & Resources
        </div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 64, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: -1, textTransform: "uppercase", lineHeight: 1 }}>
          Next<span style={{ color: "#FFB81C" }}>Play</span>
        </h1>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 600, color: "rgba(255,255,255,0.4)", margin: "4px 0 0", letterSpacing: 4, textTransform: "uppercase" }}>
          Ventures
        </h2>
        <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, #FFB81C, #4169E1)", margin: "20px auto 0", borderRadius: 2 }} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", maxWidth: 900, width: "100%" }}>
        {TEAMS.map((team) => (
          <div
            key={team.path}
            onClick={() => navigate(team.path)}
            style={{
              width: 260, cursor: "pointer",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: 28,
              transition: "transform 0.15s, border-color 0.15s, box-shadow 0.15s",
              position: "relative", overflow: "hidden",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLDivElement).style.borderColor = team.color + "55";
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${team.color}22`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${team.color}, ${team.accent})`, borderRadius: "16px 16px 0 0" }} />
            <div style={{ marginTop: 8 }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 900, color: team.color, letterSpacing: 2, textTransform: "uppercase", lineHeight: 1 }}>
                {team.name}
              </div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginTop: 6 }}>
                {team.division}
              </div>
            </div>
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: 1, textTransform: "uppercase" }}>
                {team.tools === 0 ? "Coming soon" : `${team.tools} tool${team.tools !== 1 ? "s" : ""} available`}
              </div>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: team.tools > 0 ? team.color : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: team.tools > 0 ? "#001233" : "rgba(255,255,255,0.2)" }}>
                →
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 80, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.12)", letterSpacing: 3, textTransform: "uppercase" }}>
        NextPlay Ventures · Built for the game
      </div>
    </div>
  );
}
