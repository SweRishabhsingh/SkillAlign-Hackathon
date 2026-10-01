import { useEffect, useState } from "react";
import { industryData } from "../data/industryData";
import Icon from "../components/Icon";
import { fetchMarketJobs } from "../services/marketApi";

function IndustryInsights() {
  const [profile, setProfile] = useState(null);
  const [roleData, setRoleData] = useState(null);
  const [marketJobs, setMarketJobs] = useState([]);
  const [marketStatus, setMarketStatus] = useState("idle");
  const [marketError, setMarketError] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("studentProfile");

    if (!savedProfile) {
      return;
    }

    const studentProfile = JSON.parse(savedProfile);
    setProfile(studentProfile);

    const data = industryData[studentProfile.targetRole];

    if (data) {
      setRoleData(data);
    }

    const controller = new AbortController();
    setMarketStatus("loading");

    fetchMarketJobs(studentProfile.targetRole, controller.signal)
      .then((jobs) => {
        setMarketJobs(jobs);
        setMarketStatus("ready");
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }

        setMarketError(error.message);
        setMarketStatus("error");
      });

    return () => controller.abort();
  }, []);

  if (!profile) {
    return (
      <div>
        <div className="page-header">
          <h1><Icon name="chart" /> Industry Insights</h1>
          <p>Create your profile first to view career insights.</p>
        </div>

        <div className="dashboard-card">
          <h2>No Profile Found</h2>
          <p className="card-description">
            Go to My Profile and select your target career.
          </p>
        </div>
      </div>
    );
  }

  if (!roleData) {
    return (
      <div>
        <div className="page-header">
          <h1><Icon name="chart" /> Industry Insights</h1>
          <p>No industry data available for your selected career.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1><Icon name="chart" /> Industry Insights</h1>
        <p>
          Understand the skills and competencies required for your target
          career.
        </p>
      </div>

      <div className="dashboard-card industry-role-card">
        <p className="stat-title">Your Target Career</p>
        <h2>{profile.targetRole}</h2>
        <p className="industry-category">{roleData.category}</p>
        <p className="card-description">{roleData.description}</p>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <h2>Industry Required Skills</h2>
          <span className="skill-count">
            {roleData.requiredSkills.length} Skills
          </span>
        </div>

        <div className="industry-skills">
          {roleData.requiredSkills.map((skill) => (
            <div className="industry-skill-card" key={skill.name}>
              <div>
                <h3>{skill.name}</h3>
                <p>Required for {profile.targetRole}</p>
              </div>
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
      </div>

      <div className="dashboard-card live-market-card">
        <div className="card-header">
          <div>
            <h2><Icon name="activity" /> Live Market Demand</h2>
            <p className="card-description">
              Current public job listings matching {profile.targetRole}.
            </p>
          </div>
          <span className={`market-status ${marketStatus}`}>
            {marketStatus === "loading"
              ? "Updating"
              : marketStatus === "ready"
              ? "Live"
              : "Unavailable"}
          </span>
        </div>

        {marketStatus === "loading" && (
          <p className="empty-message">Loading current market listings...</p>
        )}

        {marketStatus === "error" && (
          <p className="empty-message">
            {marketError} Showing the saved industry requirements instead.
          </p>
        )}

        {marketStatus === "ready" && marketJobs.length === 0 && (
          <p className="empty-message">
            No matching public listings were found right now.
          </p>
        )}

        {marketJobs.length > 0 && (
          <div className="market-job-list">
            {marketJobs.map((job) => (
              <article className="market-job" key={job.id}>
                <div>
                  <h3>{job.title}</h3>
                  <p>{job.company} · {job.location}</p>
                </div>
                {job.url && (
                  <a
                    className="market-job-link"
                    href={job.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    View listing <Icon name="arrow" />
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-card industry-note">
        <h2><Icon name="lightbulb" /> How SkillAlign uses this data</h2>
        <p>
          SkillAlign compares these industry requirements with your current
          skills to identify your skill gaps and recommend what you should
          learn next.
        </p>
      </div>
    </div>
  );
}

export default IndustryInsights;
