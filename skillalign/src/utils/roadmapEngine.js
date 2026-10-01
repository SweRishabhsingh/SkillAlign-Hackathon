import { learningData } from "../data/learningData";

function getPhase(priority) {
  if (priority === "Very High") {
    return "Phase 1 - Foundation";
  }

  if (priority === "High") {
    return "Phase 2 - Core Skills";
  }

  return "Phase 3 - Additional Skills";
}

export function generateRoadmap(prioritySkills) {
  return prioritySkills
    .map((skill) => {
      const learning = learningData[skill.name];

      if (!learning) {
        return null;
      }

      return {
        skill: skill.name,
        priority: skill.priority,
        phase: getPhase(skill.priority),
        ...learning,
      };
    })
    .filter((item) => item !== null);
}