import { useNavigate } from "react-router-dom";

export default function Team201112G() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight:"100vh", background:"#050d1a", fontFamily:"'Barlow',sans-serif", display:"flex", flexDirection:"column", alignItems:"center", padding:"60px 20px" }}>
      <div style={{ width:"100%", maxWidth:860, marginBottom:40 }}>
        <button onClick={() => navigate("/")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.35)", letterSpacing:2, textTransform:"uppercase", padding:0 }}>← NextPlay Ventures</button>
      </div>
      <div style={{ textAlign:"center", marginBottom:56 }}>
        <div style={{ width:200, height:4, background:"linear-gradient(90deg,#e8e8e8,#4169E1)", borderRadius:2, margin:"0 auto 28px" }} />
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.4)", letterSpacing:5, textTransform:"uppercase", marginBottom:10 }}>Lou Fusz Soccer</div>
        <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:52, fontWeight:900, color:"#fff", margin:0, letterSpacing:-1, textTransform:"uppercase" }}>2011/12G <span style={{ color:"#e8e8e8" }}>GA White</span></h1>
      </div>
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:48, textAlign:"center", maxWidth:400 }}>
        <div style={{ fontSize:40, marginBottom:16 }}>🚧</div>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:2, textTransform:"uppercase" }}>Tools Coming Soon</div>
        <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:"rgba(255,255,255,0.25)", marginTop:10, lineHeight:1.6 }}>This team's tools are being built out. Check back soon!</div>
      </div>
    </div>
  );
}
