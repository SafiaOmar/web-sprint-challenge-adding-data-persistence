// build your `Task` model here
const db = require("../../data/dbConfig");

async function getAllTasks() {
  const rows = await db("tasks").leftJoin(
    "projects",
    "tasks.project_id",
    "projects.project_id"
  );
  const newRow = rows.map((task) => {
    if (task.task_completed == 0) {
      return {
        ...task,
        task_completed: false,
      };
    } else {
      return {
        ...task,
        task_completed: true,
      };
    }
  });

  return newRow;
}

async function postTask(task) {
  const [row] = await db("tasks").insert(task);
  const [newRow] = await db("tasks").where("task_id", row);

  if (newRow.task_completed == 0) {
    return {
      ...newRow,
      task_completed: false,
    };
  } else {
    return {
      ...newRow,
      task_completed: true,
    };
  }
}

module.exports = {
  getAllTasks,
  postTask,
};