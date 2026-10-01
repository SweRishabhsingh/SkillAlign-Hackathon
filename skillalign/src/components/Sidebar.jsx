import { NavLink } from "react-router-dom";
import Icon from "./Icon";

function Sidebar() {
  const getNavClass = ({ isActive }) =>
    isActive ? "nav-item active" : "nav-item";

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <h2>SkillAlign</h2>
        <p>Career Intelligence</p>
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/dashboard" className={getNavClass}>
          <Icon name="grid" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/profile" className={getNavClass}>
          <Icon name="user" />
          <span>My Profile</span>
        </NavLink>

        <NavLink to="/skill-gap" className={getNavClass}>
          <Icon name="compass" />
          <span>Skill Gap</span>
        </NavLink>

        <NavLink
          to="/industry-insights"
          className={getNavClass}
        >
          <Icon name="chart" />
          <span>Industry Insights</span>
        </NavLink>

        <NavLink
          to="/learning-roadmap"
          className={getNavClass}
        >
          <Icon name="book" />
          <span>Learning Roadmap</span>
        </NavLink>

      </nav>
    </aside>
  );
}

export default Sidebar;