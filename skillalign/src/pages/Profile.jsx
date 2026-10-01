import { useEffect, useState } from "react";
import Icon from "../components/Icon";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    education: "",
    skills: "",
    targetRole: "",
    experience: "Beginner",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("studentProfile");

    if (!savedProfile) {
      return;
    }

    const parsedProfile = JSON.parse(savedProfile);

    setProfile({
      name: parsedProfile.name || "",
      education: parsedProfile.education || "",
      skills: Array.isArray(parsedProfile.skills)
        ? parsedProfile.skills.join(", ")
        : parsedProfile.skills || "",
      targetRole: parsedProfile.targetRole || "",
      experience: parsedProfile.experience || "Beginner",
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const profileData = {
      ...profile,

      skills: profile.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),
    };

    localStorage.setItem(
      "studentProfile",
      JSON.stringify(profileData)
    );

    setSaved(true);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1><Icon name="user" /> My Profile</h1>

          <p>
            Tell us about yourself so SkillAlign can analyze your career
            readiness.
          </p>
        </div>
      </div>

      <div className="profile-card">
        <form onSubmit={handleSubmit}>

          {/* Full Name */}

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={profile.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Education */}

          <div className="form-group">
            <label>Education</label>

            <input
              type="text"
              name="education"
              placeholder="Example: MCA"
              value={profile.education}
              onChange={handleChange}
              required
            />
          </div>

          {/* Skills */}

          <div className="form-group">
            <label>Your Skills</label>

            <input
              type="text"
              name="skills"
              placeholder="Example: HTML, CSS, JavaScript, SQL, Git"
              value={profile.skills}
              onChange={handleChange}
              required
            />

            <small>
              Enter your skills separated by commas.
            </small>
          </div>

          {/* Target Career */}

          <div className="form-group">
            <label>Target Career</label>

            <select
              name="targetRole"
              value={profile.targetRole}
              onChange={handleChange}
              required
            >
              <option value="">
                Select your target career
              </option>

              <option value="Full Stack Developer">
                Full Stack Developer
              </option>

              <option value="Frontend Developer">
                Frontend Developer
              </option>

              <option value="Backend Developer">
                Backend Developer
              </option>

              <option value="Software Engineer">
                Software Engineer
              </option>

              <option value="Data Analyst">
                Data Analyst
              </option>

              <option value="AI/ML Engineer">
                AI/ML Engineer
              </option>

              <option value="Cloud Engineer">
                Cloud Engineer
              </option>

              <option value="Cybersecurity Analyst">
                Cybersecurity Analyst
              </option>
            </select>
          </div>

          {/* Experience */}

          <div className="form-group">
            <label>Experience Level</label>

            <select
              name="experience"
              value={profile.experience}
              onChange={handleChange}
            >
              <option value="Beginner">
                Beginner
              </option>

              <option value="Intermediate">
                Intermediate
              </option>

              <option value="Advanced">
                Advanced
              </option>
            </select>
          </div>

          {/* Save */}

          <button
            type="submit"
            className="save-button"
          >
            {saved ? <><Icon name="check" /> Profile Saved</> : <><Icon name="check" /> Save Profile</>}
          </button>

          {saved && (
            <p className="profile-success">
              Your profile has been saved successfully. SkillAlign can now
              analyze your career readiness.
            </p>
          )}

        </form>
      </div>
    </div>
  );
}

export default Profile;