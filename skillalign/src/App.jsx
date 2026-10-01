import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SkillGap from "./pages/SkillGap";
import IndustryInsights from "./pages/IndustryInsights";
import LearningRoadmap from "./pages/LearningRoadmap";

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/skill-gap" element={<SkillGap />} />
            <Route
              path="/industry-insights"
              element={<IndustryInsights />}
            />
            <Route
              path="/learning-roadmap"
              element={<LearningRoadmap />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;