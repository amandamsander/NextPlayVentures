import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Team2013GA from "./pages/lou-fusz-2013ga/TeamPage";
import Team2011112G from "./pages/lou-fusz-2011-12g/TeamPage";
import Team201516B from "./pages/lou-fusz-2015-16b/TeamPage";
import PlayerCardGenerator from "./pages/lou-fusz-2013ga/PlayerCardGenerator";
import GermanyBioGenerator from "./pages/lou-fusz-2015-16b/GermanyBioGenerator";
import LouFuszGenerator from "./pages/lou-fusz-2015-16b/LouFuszGenerator";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/2013ga" element={<Team2013GA />} />
      <Route path="/2013ga/player-card" element={<PlayerCardGenerator />} />
      <Route path="/2011-12g" element={<Team2011112G />} />
      <Route path="/2015-16b" element={<Team201516B />} />
      <Route path="/2015-16b/germany-bio" element={<GermanyBioGenerator />} />
      <Route path="/2015-16b/LouFuszGenerator" element={<LouFuszGenerator />} />
    </Routes>
  );
}
