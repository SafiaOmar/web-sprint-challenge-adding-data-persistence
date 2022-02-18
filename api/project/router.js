// build your `/api/projects` router here
const router = require("express").Router();
const Project = require("./model");

router.get("/", (req, res, next) => {
  Project.getAllProjects()
    .then((resource) => {
      res.status(200).json(resource);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Project.postProject(req.body)
    .then((project) => {
      res.status(201).json(project);
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