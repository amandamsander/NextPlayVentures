# NextPlay Ventures — Claude Context

## Project Overview
NextPlay Ventures is a web-based soccer social media toolkit for generating player cards and shareable social media content for youth soccer teams under **Lou Fusz Athletic (LFA)**.

The primary goal: polished, high-energy player cards that players and parents genuinely want to show off — FIFA trading card aesthetic.

## Teams
- Lou Fusz 2013 GA
- Lou Fusz 2011/12G GA White
- Lou Fusz 2012/13G GA Gold
- Lou Fusz 2015/16B Blue Star ← most recently active

## Tech Stack
- **Frontend**: React + react-router-dom (multi-page SPA)
- **Rendering**: HTML Canvas API (this is the only reliable export method — do NOT suggest html2canvas or dom-to-image, both fail in this environment)
- **Fonts**: Anton (display), loaded via Google Fonts or embedded
- **QR codes**: qrcodejs CDN
- **Deployment**: GitHub → Netlify (build: `npm run build`, publish: `dist`)
- **Routing**: `public/_redirects` handles SPA routing on Netlify

## Card Generator — Key Design Decisions
- Card size: **600×840px**
- Color scheme: navy / royal blue / gold
- Header: Jersey Back style — jersey number + `#` in chamfered gold badge; team subtitle in gold
- Player name sits in the header block above the gold bar
- Gold sash in lower card area with tournament logos (Americas Championship centered, SuperCopa shields flanking)
- Ghost number watermark: use **blue**, not gold (tested both)
- Dark jersey on dark background: requires lighter blue mid-zone to avoid dark-on-dark artifacts

## Reference / Test Player
Addie Sander, #14, Midfielder, Grad Year 2032

## Key Conventions
- All assets (logos, backgrounds) embedded as **base64** for portability
- Canvas export with long-press save for iOS compatibility
- Form fields: first name, last name, jersey number, position (dropdown), grad year, photo upload
- Photo upload includes white background removal

## What's Built
- `LouFuszGenerator.jsx` — complete card generator for 2015/16B Blue Star
- Multi-page app structure with react-router-dom routes per team

## What's Next
- Card generators for 2011/12G GA White and 2012/13G GA Gold
- Tournament post (GA Summer Playoffs)
- Roster post (photo grid with mini player cards)

## Important Reminders
- Canvas is the only working export — don't refactor to html2canvas
- Keep assets base64-embedded
- Design direction is bold/high-energy, not generic templates
- When proposing design changes, offer 2–3 focused options rather than many variants
