import { useEffect, useState } from "react";

import { industryData } from "../data/industryData";
import { calculateSkillGap } from "../utils/skillEngine";
import Icon from "../components/Icon";

function SkillGap() {
  const [result, setResult] = useState(null);
  const [profile, setProfile] = useState(null);

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
  }, []);

  // No profile found
  if (!profile) {
    return (
      <div>
        <div className="page-header">
          <h1><Icon name="compass" /> Skill Gap Analysis</h1>

          <p>
            Create your profile first to analyze your skill gap.
          </p>
        </div>

        <div className="dashboard-card">
          <h2>No Profile Found</h2>

          <p className="card-description">
            Please go to My Profile and enter your skills and target career.
          </p>
        </div>
      </div>
    );
  }

  // Industry data not found
  if (!result) {
    return (
      <div>
        <div className="page-header">
          <h1><Icon name="compass" /> Skill Gap Analysis</h1>

          <p>
            We could not find industry requirements for your selected career.
          </p>
        </div>

        <div className="dashboard-card">
          <h2>Career Data Unavailable</h2>

          <p className="card-description">
            Please update your target career from My Profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}

      <div className="page-header">
        <div>
          <h1><Icon name="compass" /> Skill Gap Analysis</h1>

          <p>
            Compare your current skills with the requirements for your target
            career.
          </p>
        </div>
      </div>

      {/* Target Career */}

      <div className="dashboard-card role-card">
        <p className="stat-title">Target Career</p>

        <h2>{profile.targetRole}</h2>

        <p className="card-description">
          Your skills are being compared against the industry requirements for
          this role.
        </p>
      </div>

      {/* Skill Statistics */}

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-title">Job Readiness</p>

          <h2 className="stat-value">
            {result.readinessScore}%
          </h2>

          <p className="stat-subtitle">
            Current skill alignment
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-title">Skills Matched</p>

          <h2 className="stat-value">
            {result.totalMatched}
          </h2>

          <p className="stat-subtitle">
            Required skills you already have
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-title">Skills Missing</p>

          <h2 className="stat-value">
            {result.totalMissing}
          </h2>

          <p className="stat-subtitle">
            Skills you need to develop
          </p>
        </div>

        <div className="stat-card">
          <p className="stat-title">Skill Gap</p>

          <h2 className="stat-value">
            {result.skillGap}%
          </h2>

          <p className="stat-subtitle">
            Remaining gap
          </p>
        </div>
      </div>

      {/* Career Readiness */}

      <div className="dashboard-card">
        <div className="card-header">
          <h2>Career Readiness</h2>
        </div>

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
              {result.skillGap}% Gap
            </span>
          </div>
        </div>
      </div>

      {/* Matched and Missing Skills */}

      <div className="skill-gap-grid">
        {/* Matched Skills */}

        <div className="dashboard-card">
          <div className="card-header">
            <h2><Icon name="check" /> Matched Skills</h2>
          </div>

          {result.matchedSkills.length === 0 ? (
            <p className="empty-message">
              No required skills matched yet.
            </p>
          ) : (
            <div className="skill-list">
              {result.matchedSkills.map((skill) => (
                <div
                  className="skill-item"
                  key={skill.name}
                >
                  <span>
                    {skill.name}
                  </span>

                  <span className="skill-status matched">
                    Matched
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Missing Skills */}

        <div className="dashboard-card">
          <div className="card-header">
            <h2><Icon name="close" /> Missing Skills</h2>
          </div>

          {result.missingSkills.length === 0 ? (
            <p className="empty-message">
              Great! You have all the required skills.
            </p>
          ) : (
            <div className="skill-list">
              {result.missingSkills.map((skill) => (
                <div
                  className="skill-item"
                  key={skill.name}
                >
                  <span>
                    {skill.name}
                  </span>

                  <span
                    className={`priority ${
                      skill.priority === "Very High"
                        ? "very-high"
                        : skill.priority === "High"
                        ? "high"
                        : "medium"
                    }`}
                  >
                    {skill.priority}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Priority Skills */}

      <div className="dashboard-card priority-card">
        <div className="card-header">
          <h2><Icon name="lightbulb" /> What Should You Learn First?</h2>

          <span className="skill-count">
            {result.prioritySkills.length} Priority Skills
          </span>
        </div>

        <p className="card-description">
          SkillAlign ranks your missing skills based on their importance for
          your target career.
        </p>

        {result.prioritySkills.length === 0 ? (
          <p className="empty-message">
            Great! No high-priority skill gaps found.
          </p>
        ) : (
          <div className="priority-learning-list">
            {result.prioritySkills.map((skill, index) => (
              <div
                className="priority-learning-item"
                key={skill.name}
              >
                <div className="priority-rank">
                  {index + 1}
                </div>

                <div className="priority-learning-content">
                  <h3>{skill.name}</h3>

                  <p>
                    Recommended because it is important for your target
                    career.
                  </p>
                </div>

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
    </div>
  );
}

export default SkillGap;