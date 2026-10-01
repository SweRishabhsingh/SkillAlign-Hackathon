function normalizeSkill(skill) {
  return skill.trim().toLowerCase();
}

function getPriorityScore(priority) {
  if (priority === "Very High") {
    return 3;
  }

  if (priority === "High") {
    return 2;
  }

  return 1;
}

export function calculateSkillGap(studentSkills, requiredSkills) {
  const normalizedStudentSkills = studentSkills.map(normalizeSkill);

  const matchedSkills = [];
  const missingSkills = [];

  requiredSkills.forEach((skill) => {
    const normalizedRequiredSkill = normalizeSkill(skill.name);

    if (normalizedStudentSkills.includes(normalizedRequiredSkill)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // Highest-priority missing skills first
  missingSkills.sort(
    (a, b) =>
      getPriorityScore(b.priority) -
      getPriorityScore(a.priority)
  );

  const totalRequired = requiredSkills.length;
  const totalMatched = matchedSkills.length;
  const totalMissing = missingSkills.length;

  const readinessScore =
    totalRequired === 0
      ? 0
      : Math.round(
          (totalMatched / totalRequired) * 100
        );

  const skillGap = 100 - readinessScore;

  const prioritySkills = missingSkills.filter(
    (skill) =>
      skill.priority === "Very High" ||
      skill.priority === "High"
  );

  return {
    readinessScore,
    skillGap,
    totalRequired,
    totalMatched,
    totalMissing,
    matchedSkills,
    missingSkills,
    prioritySkills,
  };
}