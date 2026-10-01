
import { useEffect, useState } from "react";

import { industryData } from "../data/industryData";
import { calculateSkillGap } from "../utils/skillEngine";
import { generateRoadmap } from "../utils/roadmapEngine";
import Icon from "../components/Icon";

function LearningRoadmap() {
  const [roadmap, setRoadmap] = useState([]);
  const [completedSkills, setCompletedSkills] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("studentProfile");

    if (!savedProfile) {
      return;
    }

    const profileData = JSON.parse(savedProfile);

    setProfile(profileData);

    const roleData = industryData[profileData.targetRole];

    if (!roleData) {
      return;
    }

    const gapResult = calculateSkillGap(
      profileData.skills,
      roleData.requiredSkills
    );

    const generatedRoadmap = generateRoadmap(
      gapResult.prioritySkills
    );

    setRoadmap(generatedRoadmap);

    const savedProgress = localStorage.getItem("roadmapProgress");

    if (savedProgress) {
      const savedCompletedSkills = JSON.parse(savedProgress);
      const validCompletedSkills = savedCompletedSkills.filter(
        (skill) =>
          generatedRoadmap.some(
            (item) => item.skill === skill
          )
      );

      setCompletedSkills(validCompletedSkills);
    }
  }, []);

  const toggleComplete = (skillName) => {
    let updatedSkills;

    if (completedSkills.includes(skillName)) {
      updatedSkills = completedSkills.filter(
        (skill) => skill !== skillName
      );
    } else {
      updatedSkills = [
        ...completedSkills,
        skillName,
      ];
    }

    setCompletedSkills(updatedSkills);

    localStorage.setItem(
      "roadmapProgress",
      JSON.stringify(updatedSkills)
    );
  };

  const progress =
    roadmap.length === 0
      ? 0
      : Math.round(
          (completedSkills.length / roadmap.length) * 100
        );

  if (!profile) {
    return (
      <div>
        <div className="page-header">
          <h1><Icon name="book" /> Learning Roadmap</h1>

          <p>
            Create your profile first to generate your personalized roadmap.
          </p>
        </div>

        <div className="dashboard-card">
          <h2>No Profile Found</h2>

          <p className="card-description">
            Go to My Profile and select your skills and target career.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}

      <div className="page-header">
        <h1><Icon name="book" /> Learning Roadmap</h1>

        <p>
          A personalized learning path based on your highest-priority skill
          gaps.
        </p>
      </div>

      {/* Career */}

      <div className="dashboard-card roadmap-career-card">
        <p className="stat-title">
          Personalized Roadmap
        </p>

        <h2>{profile.targetRole}</h2>

        <p className="card-description">
          This roadmap is generated from your current skills and the
          requirements of your target career.
        </p>
      </div>

      {/* Progress */}

      <div className="dashboard-card roadmap-progress-card">
        <div className="card-header">
          <h2>Your Roadmap Progress</h2>

          <strong>{progress}%</strong>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </div>

        <p className="roadmap-progress-text">
          {completedSkills.length} of {roadmap.length} skills completed
        </p>
      </div>

      {/* No Roadmap */}

      {roadmap.length === 0 ? (
        <div className="dashboard-card">
          <h2><Icon name="check" /> No Priority Skills Found</h2>

          <p className="card-description">
            You currently have no high-priority skill gaps for your selected
            career.
          </p>
        </div>
      ) : (
        <div className="roadmap-list">
          {roadmap.map((item, index) => {
            const isCompleted = completedSkills.includes(
              item.skill
            );

            return (
              <div
                className={`dashboard-card roadmap-item ${
                  isCompleted ? "completed" : ""
                }`}
                key={item.skill}
              >
                {/* Number */}

                <div className="roadmap-number">
                  {index + 1}
                </div>

                {/* Content */}

                <div className="roadmap-content">

                  {/* Phase */}

                  <div className="roadmap-phase">
                    {item.phase}
                  </div>

                  {/* Title */}

                  <div className="roadmap-title-row">
                    <div>
                      <h2>{item.skill}</h2>

                      <p>
                        {item.category} • {item.level}
                      </p>
                    </div>

                    <span
                      className={`priority ${
                        item.priority === "Very High"
                          ? "very-high"
                          : item.priority === "High"
                          ? "high"
                          : "medium"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  {/* Description */}

                  <p className="roadmap-description">
                    {item.description}
                  </p>

                  {/* Details */}

                  <div className="roadmap-details">
                    <span>
                      <><Icon name="clock" /> {item.duration}</>
                    </span>

                    <span>
                      <><Icon name="book" /> {item.resource}</>
                    </span>
                  </div>

                  {/* Complete Button */}

                  <button
                    className={`complete-button ${
                      isCompleted
                        ? "completed-button"
                        : ""
                    }`}
                    onClick={() =>
                      toggleComplete(item.skill)
                    }
                  >
                    {isCompleted
                      ? <><Icon name="check" /> Completed</>
                      : <><Icon name="check" /> Mark as Complete</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LearningRoadmap;