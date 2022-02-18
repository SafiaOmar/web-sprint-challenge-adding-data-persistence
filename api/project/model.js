// build your `Project` model here
const db = require("../../data/dbConfig");

async function getAllProjects() {
  const rows = await db("projects");
  const newRow = rows.map((project) => {
    if (project.project_completed == 0) {
      return {
        ...project,
        project_completed: false,
      };
    } else {
      return {
        ...project,
        project_completed: true,
      };
    }
  });

  return newRow;
}

async function postProject(proj) {
  const [project] = await db("projects").insert(proj);
  const [newProject] = await db("projects").where("project_id", project);

  if (newProject.project_completed == 0) {
    return {
      ...newProject,
      project_completed: false,
    };
  } else {
    return {
      ...newProject,
      project_completed: true,
    };
  }
}

module.exports = {
  getAllProjects,
  postProject,
};