import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { industryData } from "../data/industryData";
import { calculateSkillGap } from "../utils/skillEngine";
import { generateRoadmap } from "../utils/roadmapEngine";
import Icon from "../components/Icon";
import heroImage from "../assets/hero.png";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [result, setResult] = useState(null);
  const [roadmapProgress, setRoadmapProgress] = useState(0);

  useEffect(() => {
    const savedProfile = localStorage.getItem("studentProfile");

    if (!savedProfile) {
      return;
    }

    const studentProfile = JSON.parse(savedProfile);

    setProfile(studentProfile);

    const roleData = industryData[studentProfile.targetRole];

    if (!roleData) {
      return;
    }

    const gapResult = calculateSkillGap(
      studentProfile.skills,
      roleData.requiredSkills
    );

    setResult(gapResult);

    const roadmap = generateRoadmap(gapResult.prioritySkills);
    const savedProgress = localStorage.getItem("roadmapProgress");

    if (savedProgress) {
      const completedSkills = JSON.parse(savedProgress);
      const validCompletedSkills = completedSkills.filter((skill) =>
        roadmap.some((item) => item.skill === skill)
      );

      const progress =
        roadmap.length === 0
        ? 0
        : Math.round(
            (validCompletedSkills.length / roadmap.length) * 100
          );

      setRoadmapProgress(progress);
    }
  }, []);

  if (!profile) {
    return (
      <div>
        <div className="page-header">
          <div>
            <h1>Welcome to SkillAlign</h1>
            <p>
              Create your profile to start analyzing your career readiness.
            </p>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="welcome-card-content">
            <div>
              <h2><Icon name="compass" /> Let's get started</h2>

              <p className="card-description">
                Add your current skills and target career. SkillAlign will
                compare your skills with industry requirements and create a
                personalized learning path.
              </p>

              <Link to="/profile" className="save-button">
                Create My Profile
              </Link>
            </div>

            <img
              alt="SkillAlign career planning illustration"
              className="welcome-illustration"
              src={heroImage}
            />
          </div>
        </div>

        <div className="dashboard-card how-it-works-card">
          <div className="card-header">
            <h2><Icon name="lightbulb" /> How SkillAlign Works</h2>
          </div>

          <div className="workflow-grid">
            <div className="workflow-item">
              <div className="workflow-number">1</div>
              <h3>Build Profile</h3>
              <p>
                Enter your education, current skills and target career.
              </p>
            </div>

            <div className="workflow-item">
              <div className="workflow-number">2</div>
              <h3>Industry Benchmark</h3>
              <p>
                SkillAlign compares your skills with curated industry
                requirements.
              </p>
            </div>

            <div className="workflow-item">
              <div className="workflow-number">3</div>
              <h3>Find Skill Gaps</h3>
              <p>
                Missing skills are identified and ranked by importance.
              </p>
            </div>

            <div className="workflow-item">
              <div className="workflow-number">4</div>
              <h3>Learn & Track</h3>
              <p>
                Follow your personalized roadmap and track learning progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div>
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>
            We could not calculate your career readiness.
          </p>
        </div>

        <div className="dashboard-card">
          <h2>Career data unavailable</h2>

          <p className="card-description">
            Please update your target career from My Profile.
          </p>

          <Link to="/profile" className="save-button">
            Update Profile
          </Link>
        </div>
      </div>
    );
  }

  const roleData = industryData[profile.targetRole];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Welcome, {profile.name}</h1>

          <p>
            Track your career readiness and align your skills with industry
            requirements.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-title">Job Readiness</p>

          <h2 className="stat-value">
            {result.readinessScore}%
          </h2>

          <p className="stat-subtitle">
            Current readiness score
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-title">Skills Matched</p>

          <h2 className="stat-value">
            {result.totalMatched}
          </h2>

          <p className="stat-subtitle">
            Industry skills matched
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-title">Skills to Learn</p>

          <h2 className="stat-value">
            {result.totalMissing}
          </h2>

          <p className="stat-subtitle">
            Skills identified as gaps
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-title">Roadmap Progress</p>

          <h2 className="stat-value">
            {roadmapProgress}%
          </h2>

          <p className="stat-subtitle">
            Learning roadmap completed
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Career Readiness</h2>
          </div>

          <p className="card-description">
            Your current skill alignment with your target career.
          </p>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${result.readinessScore}%`,
                }}
              ></div>
            </div>

            <div className="progress-info">
              <span>
                {result.readinessScore}% Ready
              </span>

              <span>
                {result.skillGap}% Skill Gap
              </span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2>Target Career</h2>
          </div>

          <div className="career-box">
            <h3>{profile.targetRole}</h3>
            <p>{roleData.category}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-card priority-card">
        <div className="card-header">
          <h2><Icon name="lightbulb" /> Priority Skills to Learn</h2>

          <span className="skill-count">
            {result.prioritySkills.length} Skills
          </span>
        </div>

        <p className="card-description">
          These skills have the highest importance for your target career.
        </p>

        {result.prioritySkills.length === 0 ? (
          <p className="empty-message">
            You don't currently have any high-priority skill gaps.
          </p>
        ) : (
          <div className="skill-list">
            {result.prioritySkills.map((skill) => (
              <div
                className="skill-item"
                key={skill.name}
              >
                <span>{skill.name}</span>

                <span
                  className={`priority ${
                    skill.priority === "Very High"
                      ? "very-high"
                      : "high"
                  }`}
                >
                  {skill.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h2><Icon name="compass" /> Analyze Your Skills</h2>
          </div>

          <p className="card-description">
            See exactly which skills you have and which skills you are missing.
          </p>

          <Link to="/skill-gap" className="save-button">
            View Skill Gap
          </Link>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2><Icon name="book" /> Start Learning</h2>
          </div>

          <p className="card-description">
            Follow your personalized roadmap and track your progress.
          </p>

          <Link to="/learning-roadmap" className="save-button">
            View Roadmap
          </Link>
        </div>
      </div>

      <div className="dashboard-card how-it-works-card">
        <div className="card-header">
          <h2><Icon name="lightbulb" /> How SkillAlign Works</h2>
        </div>

        <p className="card-description">
          SkillAlign converts a student's current skills into an actionable
          career development plan.
        </p>

        <div className="workflow-grid">
          <div className="workflow-item">
            <div className="workflow-number">1</div>

            <h3>Student Profile</h3>

            <p>
              Your education, current skills and target career are collected.
            </p>
          </div>

          <div className="workflow-item">
            <div className="workflow-number">2</div>

            <h3>Industry Benchmark</h3>

            <p>
              Your skills are compared against curated industry requirements.
            </p>
          </div>

          <div className="workflow-item">
            <div className="workflow-number">3</div>

            <h3>Skill Gap Analysis</h3>

            <p>
              Missing skills are identified and prioritized according to
              importance.
            </p>
          </div>

          <div className="workflow-item">
            <div className="workflow-number">4</div>

            <h3>Learning Roadmap</h3>

            <p>
              SkillAlign recommends a structured learning path and tracks
              completion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;