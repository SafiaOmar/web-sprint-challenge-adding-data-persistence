// build your `/api/tasks` router here
const router = require("express").Router();
const Task = require("./model");

router.get("/", (req, res, next) => {
  Task.getAllTasks()
    .then((resource) => {
      res.status(200).json(resource);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Task.postTask(req.body)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: "something went wrong inside the recipes router",
    message: err.message,
  });
});

module.exports = router;