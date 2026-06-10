import { useState, useRef } from "react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const POSITIONS = [
  "Goalkeeper","Defender","Center Back","Outside Back",
  "Midfielder","Defensive Mid","Attacking Mid","Winger","Forward","Striker"
];
const STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY"
];

export default function GermanyBioGenerator() {
  const [first,    setFirst]    = useState("");
  const [last,     setLast]     = useState("");
  const [month,    setMonth]    = useState("");
  const [year,     setYear]     = useState("");
  const [city,     setCity]     = useState("");
  const [state,    setState]    = useState("");
  const [position, setPosition] = useState("");
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [photoImg, setPhotoImg] = useState<HTMLImageElement | null>(null);
  const [exporting, setExporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const dispFirst    = first    || "First";
  const dispLast     = last     || "Last";
  const dispBirth    = month && year.length === 4 ? `${month} ${year}` : month || (year.length === 4 ? year : "—");
  const dispHometown = city && state ? `${city}, ${state}` : city || state || "—";
  const dispPosition = position || "—";

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const src = ev.target?.result as string;
      setPhotoSrc(src);
      const img = new Image();
      img.onload = () => setPhotoImg(img);
      img.src = src;
    };
    reader.readAsDataURL(file);
  }

  async function exportCard() {
    setExporting(true);
    await new Promise(r => setTimeout(r, 50));
    await document.fonts.ready;

    const W = 3840, H = 2160;
    const canvas = document.createElement("canvas");
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    const S = W / 900;

    // White background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W, H);

    // Germany flag columns
    const flagW = 18 * S;
    (["#1C1C1C","#CC0000","#FFCC00"] as string[]).forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(0, i * (H / 3), flagW, H / 3);
    });

    // Photo (right half)
    const photoX = W * 0.48;
    const photoW = W - photoX;
    if (photoImg) {
      const targetAR = photoW / H;
      const srcAR    = photoImg.width / photoImg.height;
      let sx = 0, sy = 0, sw = photoImg.width, sh = photoImg.height;
      if (srcAR > targetAR) { sw = photoImg.height * targetAR; sx = (photoImg.width - sw) / 2; }
      else                  { sh = photoImg.width / targetAR;  sy = 0; }
      ctx.drawImage(photoImg, sx, sy, sw, sh, photoX, 0, photoW, H);
      const grad = ctx.createLinearGradient(photoX, 0, photoX + 120 * S, 0);
      grad.addColorStop(0, "#FFFFFF");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(photoX - 2, 0, 122 * S, H);
    } else {
      const grad = ctx.createLinearGradient(photoX, 0, W, H);
      grad.addColorStop(0, "#E8E8E8");
      grad.addColorStop(1, "#D0D0D0");
      ctx.fillStyle = grad;
      ctx.fillRect(photoX, 0, photoW, H);
    }

    // Gold accent bar
    const barGrad = ctx.createLinearGradient(photoX, 0, W, 0);
    barGrad.addColorStop(0, "rgba(255,204,0,0)");
    barGrad.addColorStop(0.4, "#FFCC00");
    ctx.fillStyle = barGrad;
    ctx.fillRect(photoX, H - 5 * S, photoW, 5 * S);

    // "GERMANY 2026" badge
    const badgeFontSize = 20 * S;
    ctx.font = `700 ${badgeFontSize}px Inter, sans-serif`;
    (ctx as any).letterSpacing = `${2.5 * S}px`;
    const badgeText = "GERMANY 2026";
    const badgeTextW = ctx.measureText(badgeText).width;
    const bPadX = 8 * S, bPadY = 4 * S;
    const badgeX = flagW + 20 * S, badgeY = 18 * S;
    ctx.fillStyle = "#1C1C1C";
    ctx.fillRect(badgeX, badgeY, badgeTextW + bPadX * 2, badgeFontSize + bPadY * 2);
    ctx.fillStyle = "#FFCC00";
    ctx.textBaseline = "top";
    ctx.fillText(badgeText, badgeX + bPadX, badgeY + bPadY);
    (ctx as any).letterSpacing = "0px";

    // Player name
    const nameFontSize = 165 * S;
    const nameX = flagW + 38 * S;
    const nameY  = H * 0.38;
    ctx.font = `${nameFontSize}px 'Bebas Neue', sans-serif`;
    (ctx as any).letterSpacing = `${2 * S}px`;
    ctx.fillStyle = "#1C1C1C";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(dispFirst.toUpperCase(), nameX, nameY);
    ctx.fillStyle = "#FFCC00";
    ctx.strokeStyle = "#C8A000";
    ctx.lineWidth = 2 * S;
    ctx.strokeText(dispLast.toUpperCase(), nameX, nameY + nameFontSize * 0.95);
    ctx.fillText(dispLast.toUpperCase(),   nameX, nameY + nameFontSize * 0.95);
    (ctx as any).letterSpacing = "0px";

    // Black rule
    const ruleY = H * 0.68;
    const ruleX = flagW + 20 * S;
    const ruleW = W * 0.46;
    ctx.fillStyle = "#1C1C1C";
    ctx.fillRect(ruleX, ruleY, ruleW, 4 * S);

    // Data fields
    const fields = [
      { label: "Birthdate", value: dispBirth },
      { label: "Hometown",  value: dispHometown },
      { label: "Position",  value: dispPosition },
      { label: "Club",      value: "Lou Fusz Athletic" },
    ];
    const colW    = ruleW / 2;
    const dataY   = ruleY + 20 * S;
    const labelFS = 16 * S;
    const valueFS = 32 * S;

    fields.forEach((f, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const fx  = ruleX + col * colW;
      const fy  = dataY + row * (valueFS + labelFS + 22 * S);
      ctx.font = `700 ${labelFS}px Inter, sans-serif`;
      ctx.fillStyle = "#AAAAAA";
      ctx.textBaseline = "top";
      (ctx as any).letterSpacing = `${1.8 * S}px`;
      ctx.fillText(f.label.toUpperCase(), fx, fy);
      (ctx as any).letterSpacing = "0px";
      ctx.font = `600 ${valueFS}px Inter, sans-serif`;
      ctx.fillStyle = "#1C1C1C";
      ctx.fillText(f.value, fx, fy + labelFS + 4 * S);
    });

    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `germany2026_${(last || "player").replace(/\s+/g, "_")}.png`;
      a.click();
      URL.revokeObjectURL(url);
      setExporting(false);
    }, "image/png");
  }

  const inp: React.CSSProperties = {
    background: "#2a2a2a", border: "1px solid #3a3a3a", borderRadius: 4,
    padding: "8px 10px", color: "#fff", fontFamily: "Inter, sans-serif",
    fontSize: 13, outline: "none", width: "100%",
  };
  const sel: React.CSSProperties = { ...inp, appearance: "none", cursor: "pointer" };

  return (
    <div style={{ background: "#2a2a2a", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px 48px", gap: 24, fontFamily: "Inter, sans-serif" }}>

      <p style={{ color: "#888", fontSize: 11, letterSpacing: 3, textTransform: "uppercase" }}>
        Germany 2026 · Player Bio Card Generator · 16:9 · 4K Export
      </p>

      {/* ── LIVE PREVIEW CARD ── */}
      <div style={{ width: "min(96vw, 900px)", aspectRatio: "16/9", background: "#fff", position: "relative", overflow: "hidden", display: "flex" }}>

        {/* Flag columns */}
        <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: 18, display: "flex", flexDirection: "column", zIndex: 3 }}>
          <div style={{ flex: 1, background: "#1C1C1C" }} />
          <div style={{ flex: 1, background: "#CC0000" }} />
          <div style={{ flex: 1, background: "#FFCC00" }} />
        </div>

        {/* Info panel */}
        <div style={{ position: "relative", width: "50%", height: "100%", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 2, flexShrink: 0, paddingLeft: 18 }}>
          <div style={{ padding: "18px 20px 0 20px" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(7px,1vw,10px)", fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "#FFCC00", background: "#1C1C1C", padding: "4px 8px", display: "inline-block" }}>
              Germany 2026
            </span>
          </div>
          <div style={{ padding: "0 20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px,7.5vw,72px)", color: "#1C1C1C", lineHeight: 0.95, letterSpacing: 2 }}>{dispFirst}</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px,7.5vw,72px)", color: "#FFCC00", lineHeight: 0.95, letterSpacing: 2, WebkitTextStroke: "1px #C8A000" }}>{dispLast}</div>
          </div>
          <div>
            <div style={{ borderTop: "2px solid #1C1C1C", margin: "0 20px" }} />
            <div style={{ margin: "0 20px", padding: "10px 0 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px" }}>
              {[
                { label: "Birthdate", value: dispBirth },
                { label: "Hometown",  value: dispHometown },
                { label: "Position",  value: dispPosition },
                { label: "Club",      value: "Lou Fusz Athletic" },
              ].map(f => (
                <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: "clamp(6px,0.85vw,8px)", fontWeight: 700, letterSpacing: 1.8, textTransform: "uppercase", color: "#AAAAAA" }}>{f.label}</span>
                  <span style={{ fontSize: "clamp(10px,1.6vw,15px)", fontWeight: 600, color: "#1C1C1C", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Photo */}
        <div style={{ position: "absolute", right: 0, top: 0, width: "52%", height: "100%", zIndex: 1 }}>
          {photoSrc
            ? <img src={photoSrc} alt="player" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
            : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#E8E8E8,#D0D0D0)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <svg viewBox="0 0 24 24" style={{ width: "20%", opacity: 0.25, fill: "#1C1C1C" }}><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                <span style={{ fontSize: "clamp(8px,1vw,11px)", letterSpacing: 3, textTransform: "uppercase", color: "#999", fontWeight: 600 }}>Player Photo</span>
              </div>
          }
          <div style={{ position: "absolute", top: 0, left: 0, width: 60, height: "100%", background: "linear-gradient(to right,#fff,rgba(255,255,255,0))", zIndex: 2 }} />
        </div>

        {/* Accent bar */}
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "52%", height: 5, background: "linear-gradient(90deg,transparent,#FFCC00 40%)", zIndex: 5 }} />
      </div>

      {/* ── CONTROLS ── */}
      <div style={{ width: "min(96vw, 900px)", background: "#1e1e1e", borderRadius: 8, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", color: "#FFCC00", fontWeight: 700 }}>Player Info</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px 14px" }}>
          <Field label="First Name"><input style={inp} placeholder="First name" value={first} onChange={e => setFirst(e.target.value)} /></Field>
          <Field label="Last Name"><input style={inp} placeholder="Last name" value={last} onChange={e => setLast(e.target.value)} /></Field>
          <Field label="Position">
            <select style={sel} value={position} onChange={e => setPosition(e.target.value)}>
              <option value="">— Select —</option>
              {POSITIONS.map(p => <option key={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Birthdate">
            <div style={{ display: "flex", gap: 6 }}>
              <select style={{ ...sel, flex: 1.2 }} value={month} onChange={e => setMonth(e.target.value)}>
                <option value="">Mon</option>
                {MONTHS.map(m => <option key={m}>{m}</option>)}
              </select>
              <input style={{ ...inp, flex: 1 }} type="number" placeholder="Year" min={2000} max={2025} value={year} onChange={e => setYear(e.target.value)} />
            </div>
          </Field>
          <Field label="City"><input style={inp} placeholder="City" value={city} onChange={e => setCity(e.target.value)} /></Field>
          <Field label="State">
            <select style={sel} value={state} onChange={e => setState(e.target.value)}>
              <option value="">— State —</option>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 4, flexWrap: "wrap" }}>
          <input type="file" accept="image/*" ref={fileRef} style={{ display: "none" }} onChange={handlePhoto} />
          <button style={{ background: "#1C1C1C", color: "#FFCC00", border: "1px solid #FFCC00", borderRadius: 4, padding: "9px 18px", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer" }}
            onClick={() => fileRef.current?.click()}>
            Upload Photo
          </button>
          <button style={{ background: "#FFCC00", color: "#1C1C1C", border: "none", borderRadius: 4, padding: "9px 22px", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", opacity: exporting ? 0.5 : 1 }}
            onClick={exportCard} disabled={exporting}>
            {exporting ? "Rendering…" : "⬇ Export 4K PNG"}
          </button>
          <span style={{ fontSize: 11, color: "#555" }}>Fill in all fields, upload photo, then export.</span>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#666" }}>{label}</label>
      {children}
    </div>
  );
}
