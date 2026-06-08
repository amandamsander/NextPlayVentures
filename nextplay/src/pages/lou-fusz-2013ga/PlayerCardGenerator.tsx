import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const POSITIONS = ["Goalkeeper","Defender","Midfielder","Forward","Winger","Striker","Center Back","Full Back"];
const W = 540, H = 540, INFO_H = 96, GOLD_H = 34;

function useQRLib() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if ((window as any).QRCode) { setLoaded(true); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
    s.onload = () => setLoaded(true);
    document.head.appendChild(s);
  }, []);
  return loaded;
}

function QRCodeWidget({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrLoaded = useQRLib();
  useEffect(() => {
    if (!qrLoaded || !containerRef.current) return;
    containerRef.current.innerHTML = "";
    if (!url) return;
    try { new (window as any).QRCode(containerRef.current, { text: url, width: 52, height: 52, colorDark: "#000", colorLight: "#fff", correctLevel: (window as any).QRCode.CorrectLevel.M }); }
    catch(e) {}
  }, [url, qrLoaded]);
  if (!url) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
      <div style={{ width:52, height:52, background:"rgba(255,255,255,0.08)", borderRadius:4, border:"1px dashed rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:8, color:"rgba(255,255,255,0.2)", letterSpacing:1 }}>QR</span>
      </div>
      <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.28)", letterSpacing:2, textTransform:"uppercase" }}>Schedule</span>
    </div>
  );
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
      <div style={{ background:"#fff", borderRadius:4, padding:3, lineHeight:0 }}><div ref={containerRef} /></div>
      <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.28)", letterSpacing:2, textTransform:"uppercase" }}>Schedule</span>
    </div>
  );
}

function PlayerCard({ data, cardRef, photoOffset }: { data: any, cardRef: any, photoOffset: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const { playerName, playerNumber, photo, scheduleUrl, gradYear, position, eventName, teamLabel } = data;
  const [nameFontSize, setNameFontSize] = useState(36);

  useEffect(() => {
    const el = nameRef.current; if (!el) return;
    let size = 36; el.style.fontSize = size + "px";
    while (el.scrollWidth > el.offsetWidth && size > 14) { size--; el.style.fontSize = size + "px"; }
    setNameFontSize(size);
  }, [playerName, playerNumber]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !playerNumber) { if (canvas) canvas.getContext("2d")!.clearRect(0,0,canvas.width,canvas.height); return; }
    const ctx = canvas.getContext("2d")!;
    const CW = 240, CH = 340;
    canvas.width = CW; canvas.height = CH;
    const off = document.createElement("canvas"); off.width = CW; off.height = CH;
    const octx = off.getContext("2d")!;
    let fs = CH; octx.textBaseline = "bottom";
    do { octx.font = `900 italic ${fs}px "Barlow Condensed",Arial Black,sans-serif`; fs -= 2; }
    while (octx.measureText(playerNumber).width > CW - 10 && fs > 10);
    octx.fillStyle = "#4169E1"; octx.textAlign = "center"; octx.fillText(playerNumber, CW/2, CH);
    let t = 0; let animFrame: number;
    function drawFlag() {
      ctx.clearRect(0,0,CW,CH);
      const slices = 60, sw = CW/slices;
      for (let i = 0; i < slices; i++) {
        const x = i*sw, dist = i/slices;
        const wave = Math.sin(dist*Math.PI*2.2 - t*3.5)*dist*18 + Math.sin(dist*Math.PI*1.4 - t*2.1)*dist*8;
        ctx.drawImage(off, x, 0, sw, CH, x, wave, sw, CH);
      }
      t += 0.018; animFrame = requestAnimationFrame(drawFlag);
    }
    drawFlag();
    return () => cancelAnimationFrame(animFrame);
  }, [playerNumber]);

  const posDisplay = position || "Position";
  const gradDisplay = gradYear || "20XX";
  const nameDisplay = playerName ? playerName.toUpperCase() : "PLAYER NAME";
  const numDisplay = playerNumber ? `#${playerNumber}` : "#00";
  const eventDisplay = eventName ? eventName.toUpperCase() : "GA SUMMER PLAYOFFS";
  const posGradDisplay = gradYear ? `${posDisplay} · ${gradYear}` : posDisplay;
  const teamLabelDisplay = teamLabel || "Lou Fusz · 2013 GA";

  return (
    <div ref={cardRef} style={{ width:W, height:H, position:"relative", overflow:"hidden", borderRadius:18, backgroundColor:"#001233", boxShadow:"0 0 0 1.5px rgba(255,184,28,0.4),0 30px 80px rgba(0,0,0,0.9),0 0 60px rgba(65,105,225,0.2)", flexShrink:0 }}>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(148deg,#001a4d 0%,#002868 45%,#000e26 100%)" }} />
      <div style={{ position:"absolute", bottom:-80, right:-80, width:380, height:380, background:"radial-gradient(circle,rgba(65,105,225,0.5) 0%,transparent 65%)", borderRadius:"50%" }} />
      <div style={{ position:"absolute", top:-60, left:-60, width:240, height:240, background:"radial-gradient(circle,rgba(255,184,28,0.1) 0%,transparent 65%)", borderRadius:"50%" }} />
      <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-20%", left:"-10%", width:"55%", height:"160%", background:"rgba(65,105,225,0.11)", transform:"rotate(-14deg)", transformOrigin:"top left" }} />
        <div style={{ position:"absolute", top:"-20%", left:"5%", width:"18%", height:"160%", background:"rgba(255,184,28,0.07)", transform:"rotate(-14deg)", transformOrigin:"top left" }} />
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, width:0, height:0, borderStyle:"solid", borderWidth:"0 0 180px 180px", borderColor:"transparent transparent rgba(65,105,225,0.1) transparent", zIndex:2 }} />
      <div style={{ position:"absolute", top:0, right:0, width:0, height:0, borderStyle:"solid", borderWidth:"0 160px 160px 0", borderColor:"transparent rgba(255,184,28,0.07) transparent transparent", zIndex:2 }} />
      <div style={{ position:"absolute", inset:0, overflow:"hidden", zIndex:3, pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:"-50%", left:"38%", width:2, height:"200%", background:"linear-gradient(180deg,transparent 0%,rgba(255,184,28,0.35) 30%,rgba(255,184,28,0.35) 70%,transparent 100%)", transform:"rotate(-14deg)" }} />
        <div style={{ position:"absolute", top:"-50%", left:"44%", width:1, height:"200%", background:"linear-gradient(180deg,transparent 0%,rgba(65,105,225,0.4) 30%,rgba(65,105,225,0.4) 70%,transparent 100%)", transform:"rotate(-14deg)" }} />
      </div>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:5, background:"linear-gradient(90deg,#cc8f00 0%,#FFB81C 30%,#ffd56b 55%,#FFB81C 75%,#cc8f00 100%)", zIndex:20 }} />
      <div style={{ position:"absolute", left:0, top:5, bottom:0, width:4, background:"linear-gradient(180deg,#4169E1 0%,rgba(65,105,225,0.06) 100%)", zIndex:20 }} />
      <canvas ref={canvasRef} style={{ position:"absolute", bottom:INFO_H+10, right:15, zIndex:15, pointerEvents:"none", opacity:0.42 }} />
      <div style={{ position:"absolute", top:16, left:20, display:"flex", flexDirection:"column", gap:0, zIndex:15 }}>
        <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:18, fontWeight:900, color:"#FFB81C", letterSpacing:3, textTransform:"uppercase", lineHeight:1 }}>{teamLabelDisplay.split("·")[0]?.trim()||"Lou Fusz"}</span>
        <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:5 }}>
          <div style={{ width:20, height:2, background:"#4169E1", flexShrink:0 }} />
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.45)", letterSpacing:3, textTransform:"uppercase" }}>{teamLabelDisplay.split("·")[1]?.trim()||"2013 GA"}</span>
        </div>
      </div>
      <div style={{ position:"absolute", top:14, right:18, zIndex:15, display:"flex", flexDirection:"column", alignItems:"flex-end" }}>
        <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.3)", letterSpacing:2, textTransform:"uppercase" }}>Class of</span>
        <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:30, fontWeight:900, color:"#FFB81C", lineHeight:1, textShadow:"0 0 24px rgba(255,184,28,0.5)" }}>{gradDisplay}</span>
      </div>
      <div style={{ position:"absolute", top:20, bottom:INFO_H+10, left:"50%", transform:"translateX(-50%)", width:"72%", zIndex:6, overflow:"hidden", borderRadius:8 }}>
        {photo ? (
          <img src={photo} alt="Player" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:`center ${photoOffset}%`, display:"block", WebkitMaskImage:"linear-gradient(to bottom,transparent 0%,black 18%,black 60%,transparent 100%),linear-gradient(to right,transparent 0%,black 12%,black 88%,transparent 100%)", WebkitMaskComposite:"destination-in", maskImage:"linear-gradient(to bottom,transparent 0%,black 18%,black 60%,transparent 100%),linear-gradient(to right,transparent 0%,black 12%,black 88%,transparent 100%)", maskComposite:"intersect" } as any} />
        ) : (
          <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:14, border:"1.5px dashed rgba(65,105,225,0.3)", borderRadius:8, background:"linear-gradient(180deg,rgba(65,105,225,0.07) 0%,rgba(0,18,51,0.03) 100%)" }}>
            <div style={{ width:58, height:58, background:"rgba(65,105,225,0.18)", border:"1.5px solid rgba(65,105,225,0.3)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="30" height="30" fill="rgba(255,255,255,0.25)" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
            </div>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.2)", letterSpacing:2, textTransform:"uppercase" }}>Player Photo</span>
          </div>
        )}
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:12, background:"linear-gradient(0deg,rgba(0,20,60,0.99) 0%,rgba(0,20,60,0.96) 60%,rgba(0,20,60,0.75) 85%,transparent 100%)" }}>
        <div style={{ background:"linear-gradient(90deg,#FFB81C 0%,#e6a000 100%)", padding:"5px 18px 5px 22px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:16, fontWeight:900, color:"#001233", letterSpacing:1.5, textTransform:"uppercase", whiteSpace:"nowrap" }}>{posGradDisplay}</span>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:16, fontWeight:700, color:"#001a3a", letterSpacing:1, textTransform:"uppercase", whiteSpace:"nowrap" }}>{eventDisplay}</span>
        </div>
        <div style={{ padding:"10px 18px 14px 22px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div ref={nameRef} style={{ display:"flex", alignItems:"baseline", gap:10, flexWrap:"nowrap", minWidth:0, overflow:"hidden", flex:1 }}>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:nameFontSize, fontWeight:900, fontStyle:"italic", color:"#fff", lineHeight:1, textTransform:"uppercase", letterSpacing:-0.5, whiteSpace:"nowrap" }}>{nameDisplay}</span>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:nameFontSize, fontWeight:900, fontStyle:"italic", color:"#FFB81C", lineHeight:1, whiteSpace:"nowrap" }}>{numDisplay}</span>
          </div>
          <div style={{ display:"flex", flexDirection:"row", alignItems:"center", gap:8, marginTop:8, flexShrink:0 }}>
            <QRCodeWidget url={scheduleUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

async function renderCardToCanvas(data: any, photoOffset: number) {
  const { playerName, playerNumber, photo, scheduleUrl, gradYear, position, eventName, teamLabel } = data;
  const scale = 2;
  const c = document.createElement("canvas");
  c.width = W*scale; c.height = H*scale;
  const ctx = c.getContext("2d")!;
  ctx.scale(scale, scale);

  function roundRect(x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
    ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h); ctx.lineTo(x+r,y+h);
    ctx.quadraticCurveTo(x,y+h,x,y+h-r); ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
  }

  roundRect(0,0,W,H,18); ctx.clip();

  const bg = ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,"#001a4d"); bg.addColorStop(0.45,"#002868"); bg.addColorStop(1,"#000e26");
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

  const rg1 = ctx.createRadialGradient(W+80,H+80,0,W+80,H+80,380);
  rg1.addColorStop(0,"rgba(65,105,225,0.5)"); rg1.addColorStop(1,"transparent");
  ctx.fillStyle=rg1; ctx.fillRect(0,0,W,H);

  ctx.save(); ctx.globalAlpha=0.11; ctx.fillStyle="#4169E1";
  ctx.translate(-0.1*W,-0.2*H); ctx.rotate(-14*Math.PI/180); ctx.fillRect(0,0,0.55*W,1.6*H); ctx.restore();
  ctx.save(); ctx.globalAlpha=0.07; ctx.fillStyle="#FFB81C";
  ctx.translate(0.05*W,-0.2*H); ctx.rotate(-14*Math.PI/180); ctx.fillRect(0,0,0.18*W,1.6*H); ctx.restore();

  if (photo) {
    await new Promise<void>(resolve => {
      const img = new Image();
      img.onload = () => {
        const px=W*0.14, pw=W*0.72, py=20, ph=H-INFO_H-30;
        ctx.save(); ctx.beginPath(); ctx.rect(px,py,pw,ph); ctx.clip();
        const s2=Math.max(pw/img.width,ph/img.height);
        const iw=img.width*s2, ih=img.height*s2;
        ctx.drawImage(img,px+(pw-iw)/2,py+(ph-ih)*(photoOffset/100),iw,ih);
        const f1=ctx.createLinearGradient(0,py,0,py+ph*0.18); f1.addColorStop(0,"rgba(0,18,51,1)"); f1.addColorStop(1,"rgba(0,18,51,0)"); ctx.fillStyle=f1; ctx.fillRect(px,py,pw,ph*0.18);
        const f2=ctx.createLinearGradient(0,py+ph*0.6,0,py+ph); f2.addColorStop(0,"rgba(0,18,51,0)"); f2.addColorStop(1,"rgba(0,18,51,1)"); ctx.fillStyle=f2; ctx.fillRect(px,py+ph*0.6,pw,ph*0.4);
        const f3=ctx.createLinearGradient(px,0,px+pw*0.12,0); f3.addColorStop(0,"rgba(0,18,51,1)"); f3.addColorStop(1,"rgba(0,18,51,0)"); ctx.fillStyle=f3; ctx.fillRect(px,py,pw*0.12,ph);
        const f4=ctx.createLinearGradient(px+pw*0.88,0,px+pw,0); f4.addColorStop(0,"rgba(0,18,51,0)"); f4.addColorStop(1,"rgba(0,18,51,1)"); ctx.fillStyle=f4; ctx.fillRect(px+pw*0.88,py,pw*0.12,ph);
        ctx.restore(); resolve();
      };
      img.onerror = () => resolve();
      img.src = photo;
    });
  }

  if (playerNumber) {
    const nw=240, nh=340;
    const off2=document.createElement("canvas"); off2.width=nw; off2.height=nh;
    const o2=off2.getContext("2d")!;
    let fs2=nh; o2.textBaseline="bottom";
    do { o2.font=`900 italic ${fs2}px "Barlow Condensed",Arial Black,sans-serif`; fs2-=2; }
    while(o2.measureText(playerNumber).width>nw-10&&fs2>10);
    o2.fillStyle="#4169E1"; o2.textAlign="center"; o2.fillText(playerNumber,nw/2,nh);
    ctx.save(); ctx.globalAlpha=0.42; ctx.drawImage(off2,W-nw-15,H-INFO_H-nh-10,nw,nh); ctx.restore();
  }

  const pg=ctx.createLinearGradient(0,H-INFO_H-20,0,H);
  pg.addColorStop(0,"rgba(0,20,60,0)"); pg.addColorStop(0.3,"rgba(0,20,60,0.96)"); pg.addColorStop(1,"rgba(0,20,60,0.99)");
  ctx.fillStyle=pg; ctx.fillRect(0,H-INFO_H-20,W,INFO_H+20);

  const goldY=H-INFO_H;
  const gg=ctx.createLinearGradient(0,0,W,0); gg.addColorStop(0,"#FFB81C"); gg.addColorStop(1,"#e6a000");
  ctx.fillStyle=gg; ctx.fillRect(0,goldY,W,GOLD_H);
  ctx.fillStyle="#001233"; ctx.textBaseline="middle";
  const posGrad2=gradYear?`${position||"Position"} · ${gradYear}`:(position||"Position");
  ctx.font=`900 16px "Barlow Condensed",sans-serif`; ctx.textAlign="left"; ctx.fillText(posGrad2.toUpperCase(),22,goldY+GOLD_H/2);
  ctx.textAlign="right"; ctx.fillText((eventName||"GA SUMMER PLAYOFFS").toUpperCase(),W-18,goldY+GOLD_H/2);

  const nameY=goldY+GOLD_H;
  const nText=(playerName||"PLAYER NAME").toUpperCase();
  const numText=playerNumber?`#${playerNumber}`:"#00";
  let ns=36; ctx.font=`900 italic ${ns}px "Barlow Condensed",sans-serif`;
  while(ctx.measureText(nText+"  "+numText).width>W-100&&ns>14){ns--;ctx.font=`900 italic ${ns}px "Barlow Condensed",sans-serif`;}
  const nRowH=H-nameY; ctx.textBaseline="middle"; ctx.textAlign="left"; ctx.fillStyle="#ffffff";
  ctx.fillText(nText,22,nameY+nRowH/2);
  const nw2=ctx.measureText(nText).width; ctx.fillStyle="#FFB81C"; ctx.fillText(numText,22+nw2+10,nameY+nRowH/2);

  if (scheduleUrl && (window as any).QRCode) {
    await new Promise<void>(resolve => {
      const div=document.createElement("div"); div.style.cssText="position:fixed;left:-9999px;top:-9999px;";
      document.body.appendChild(div);
      try {
        new (window as any).QRCode(div,{text:scheduleUrl,width:52,height:52,colorDark:"#000",colorLight:"#fff",correctLevel:(window as any).QRCode.CorrectLevel.M});
        setTimeout(()=>{
          const qrImg=div.querySelector("img")||div.querySelector("canvas");
          if(qrImg){
            const qc=document.createElement("canvas"); qc.width=58; qc.height=58;
            const qctx=qc.getContext("2d")!; qctx.fillStyle="#fff"; qctx.fillRect(0,0,58,58);
            if((qrImg as HTMLCanvasElement).tagName==="CANVAS"){qctx.drawImage(qrImg as HTMLCanvasElement,3,3,52,52);ctx.drawImage(qc,W-80,nameY+(nRowH-58)/2);}
            else{const i2=new Image();i2.onload=()=>{qctx.drawImage(i2,3,3,52,52);ctx.drawImage(qc,W-80,nameY+(nRowH-58)/2);document.body.removeChild(div);resolve();};i2.src=(qrImg as HTMLImageElement).src;return;}
          }
          document.body.removeChild(div);resolve();
        },200);
      }catch(e){document.body.removeChild(div);resolve();}
    });
  }

  const tg=ctx.createLinearGradient(0,0,W,0);
  tg.addColorStop(0,"#cc8f00");tg.addColorStop(0.3,"#FFB81C");tg.addColorStop(0.55,"#ffd56b");tg.addColorStop(0.75,"#FFB81C");tg.addColorStop(1,"#cc8f00");
  ctx.fillStyle=tg; ctx.fillRect(0,0,W,5);
  const ssg=ctx.createLinearGradient(0,0,0,H); ssg.addColorStop(0,"#4169E1"); ssg.addColorStop(1,"rgba(65,105,225,0.06)");
  ctx.fillStyle=ssg; ctx.fillRect(0,5,4,H-5);

  const tl=(teamLabel||"Lou Fusz · 2013 GA").split("·");
  ctx.font=`900 18px "Barlow Condensed",sans-serif`; ctx.fillStyle="#FFB81C"; ctx.textAlign="left"; ctx.textBaseline="top";
  ctx.fillText((tl[0]||"Lou Fusz").trim().toUpperCase(),20,16);
  ctx.fillStyle="rgba(255,255,255,0.45)"; ctx.font=`600 11px "Barlow Condensed",sans-serif`;
  ctx.fillText((tl[1]||"2013 GA").trim().toUpperCase(),47,40);
  ctx.fillStyle="#4169E1"; ctx.fillRect(20,39,20,2);

  ctx.font=`700 9px "Barlow Condensed",sans-serif`; ctx.fillStyle="rgba(255,255,255,0.3)";
  ctx.textAlign="right"; ctx.textBaseline="top"; ctx.fillText("CLASS OF",W-18,14);
  ctx.font=`900 30px "Barlow Condensed",sans-serif`; ctx.fillStyle="#FFB81C";
  ctx.fillText(gradYear||"20XX",W-18,24);

  return c;
}

export default function PlayerCardGenerator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    playerName:"", playerNumber:"", photo: null as string|null,
    scheduleUrl:"https://system.gotsport.com/org_event/events/47824/schedules?team=4016240",
    gradYear:"", position:"", eventName:"GA Summer Playoffs", teamLabel:"Lou Fusz · 2013 GA"
  });
  const [downloading, setDownloading] = useState(false);
  const [photoOffset, setPhotoOffset] = useState(50);
  const [generatedImage, setGeneratedImage] = useState<string|null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name==="playerNumber" ? value.replace(/\D/g,"") : value }));
  }
  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setForm(f => ({ ...f, photo: ev.target?.result as string }));
    reader.readAsDataURL(file);
  }
  function handleReset() {
    setForm({ playerName:"", playerNumber:"", photo:null, scheduleUrl:"https://system.gotsport.com/org_event/events/47824/schedules?team=4016240", gradYear:"", position:"", eventName:"GA Summer Playoffs", teamLabel:"Lou Fusz · 2013 GA" });
    setPhotoOffset(50); setGeneratedImage(null);
    if (fileInputRef.current) fileInputRef.current.value="";
  }
  async function handleGenerate() {
    setDownloading(true); setGeneratedImage(null);
    try {
      const canvas = await renderCardToCanvas(form, photoOffset);
      setGeneratedImage(canvas.toDataURL("image/png"));
    } catch(e) { console.error(e); alert("Generation failed — try again."); }
    setDownloading(false);
  }

  const inputStyle: React.CSSProperties = { width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(65,105,225,0.35)", borderRadius:6, color:"#fff", padding:"10px 12px", fontFamily:"'Barlow Condensed',sans-serif", fontSize:15, letterSpacing:1, outline:"none", boxSizing:"border-box" };
  const labelStyle: React.CSSProperties = { fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, color:"#FFB81C", letterSpacing:2.5, textTransform:"uppercase", marginBottom:5, display:"block" };
  const fieldStyle: React.CSSProperties = { marginBottom:18 };

  return (
    <div style={{ minHeight:"100vh", background:"#050d1a", display:"flex", flexDirection:"column", alignItems:"center", fontFamily:"'Barlow',sans-serif", padding:"40px 20px" }}>
      <div style={{ width:"100%", maxWidth:1120, marginBottom:24 }}>
        <button onClick={() => navigate("/2013ga")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.35)", letterSpacing:2, textTransform:"uppercase", padding:0 }}>
          ← 2012/13G GA Gold
        </button>
      </div>

      <div style={{ textAlign:"center", marginBottom:40 }}>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, color:"#FFB81C", letterSpacing:4, textTransform:"uppercase", opacity:0.6, marginBottom:4 }}>NextPlay Ventures · Lou Fusz 2012/13G GA Gold</div>
        <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:42, fontWeight:900, color:"#fff", margin:0, letterSpacing:-1, textTransform:"uppercase" }}>Player Card <span style={{ color:"#FFB81C" }}>Builder</span></h1>
      </div>

      <div style={{ display:"flex", gap:48, alignItems:"flex-start", flexWrap:"wrap", justifyContent:"center", width:"100%", maxWidth:1120 }}>
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(65,105,225,0.2)", borderRadius:14, padding:32, width:320, flexShrink:0 }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.4)", letterSpacing:3, textTransform:"uppercase", marginBottom:24 }}>Player Details</div>
          <div style={fieldStyle}><label style={labelStyle}>Player Name</label><input style={inputStyle} name="playerName" value={form.playerName} onChange={handleChange} placeholder="e.g. Addelyn Sander" /></div>
          <div style={fieldStyle}><label style={labelStyle}>Jersey Number</label><input style={inputStyle} name="playerNumber" value={form.playerNumber} onChange={handleChange} placeholder="e.g. 14" maxLength={3} /></div>
          <div style={fieldStyle}><label style={labelStyle}>Position</label>
            <select style={{ ...inputStyle, cursor:"pointer" }} name="position" value={form.position} onChange={handleChange}>
              <option value="">Select Position</option>
              {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div style={fieldStyle}><label style={labelStyle}>Graduation Year</label><input style={inputStyle} name="gradYear" value={form.gradYear} onChange={handleChange} placeholder="e.g. 2031" maxLength={4} /></div>
          <div style={fieldStyle}><label style={labelStyle}>Team Label</label><input style={inputStyle} name="teamLabel" value={form.teamLabel} onChange={handleChange} placeholder="e.g. Lou Fusz · 2016B Blue Star" /><div style={{ fontFamily:"'Barlow',sans-serif", fontSize:11, color:"rgba(255,255,255,0.25)", marginTop:5 }}>Use · to separate name from division</div></div>
          <div style={fieldStyle}><label style={labelStyle}>Event Name</label><input style={inputStyle} name="eventName" value={form.eventName} onChange={handleChange} placeholder="e.g. GA Summer Playoffs" /></div>
          <div style={fieldStyle}><label style={labelStyle}>Schedule URL</label><input style={inputStyle} name="scheduleUrl" value={form.scheduleUrl} onChange={handleChange} placeholder="https://..." /></div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Player Photo</label>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display:"none" }} id="photoUpload" />
            <label htmlFor="photoUpload" style={{ display:"block", width:"100%", textAlign:"center", background:"rgba(65,105,225,0.15)", border:"1.5px dashed rgba(65,105,225,0.5)", borderRadius:6, padding:"12px 0", cursor:"pointer", fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:700, color:form.photo?"#FFB81C":"rgba(255,255,255,0.5)", letterSpacing:2, textTransform:"uppercase", boxSizing:"border-box" }}>
              {form.photo ? "✓ Photo Uploaded" : "Upload Photo"}
            </label>
            {form.photo && <button onClick={() => { setForm(f=>({...f,photo:null})); if(fileInputRef.current) fileInputRef.current.value=""; }} style={{ marginTop:6, background:"none", border:"none", color:"rgba(255,100,100,0.6)", fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, cursor:"pointer", letterSpacing:1 }}>Remove photo</button>}
          </div>
          {form.photo && (
            <div style={fieldStyle}><label style={labelStyle}>Photo Position</label>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:1 }}>TOP</span>
                <input type="range" min={0} max={100} value={photoOffset} onChange={e=>setPhotoOffset(Number(e.target.value))} style={{ flex:1, accentColor:"#FFB81C", cursor:"pointer" }} />
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:1 }}>BOT</span>
              </div>
            </div>
          )}
          <button onClick={handleGenerate} disabled={downloading} style={{ width:"100%", marginBottom:10, background:downloading?"rgba(255,184,28,0.3)":"linear-gradient(90deg,#FFB81C 0%,#e6a000 100%)", border:"none", borderRadius:6, color:"#001233", padding:"13px 0", fontFamily:"'Barlow Condensed',sans-serif", fontSize:15, fontWeight:900, letterSpacing:3, textTransform:"uppercase", cursor:downloading?"not-allowed":"pointer" }}>
            {downloading?"Generating…":"🖼 Generate Card Image"}
          </button>
          {generatedImage && (
            <div style={{ marginBottom:10, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,184,28,0.2)", borderRadius:10, padding:16, textAlign:"center" }}>
              <img src={generatedImage} alt="Generated card" style={{ width:"100%", borderRadius:8, display:"block", marginBottom:10 }} />
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, color:"#FFB81C", letterSpacing:1.5, textTransform:"uppercase", marginBottom:8 }}>📱 Long-press image → Save to Photos</div>
              <a href={generatedImage} download={`lou_fusz_${(form.playerName||"player").replace(/\s+/g,"_").toLowerCase()}_card.png`} style={{ display:"inline-block", fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.4)", letterSpacing:1.5, textTransform:"uppercase", textDecoration:"underline" }}>💾 Download file</a>
            </div>
          )}
          <button onClick={handleReset} style={{ width:"100%", background:"transparent", border:"1px solid rgba(255,184,28,0.25)", borderRadius:6, color:"rgba(255,184,28,0.5)", padding:"10px 0", fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:700, letterSpacing:2, textTransform:"uppercase", cursor:"pointer" }}>Reset</button>
        </div>

        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,184,28,0.5)", letterSpacing:3, textTransform:"uppercase" }}>Live Preview</div>
          <PlayerCard data={form} cardRef={cardRef} photoOffset={photoOffset} />
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, color:"rgba(255,255,255,0.2)", letterSpacing:2, textTransform:"uppercase" }}>Lou Fusz 2012/13G GA Gold · Player Event Card</div>
        </div>
      </div>
    </div>
  );
}
