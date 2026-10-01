function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        Skill<span>Align</span>
      </div>

      <div className="navbar-right">
        <span className="notification">Notification</span>

        <div className="profile">
          <div className="profile-avatar">R</div>
          <div>
            <p className="profile-name">Student</p>
            <p className="profile-role">Learner</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;