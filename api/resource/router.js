// build your `/api/resources` router here
const router = require("express").Router();
const Resource = require("./model");

router.get("/", (req, res, next) => {
  Resource.getAllResources()
    .then((resource) => {
      res.status(200).json(resource);
    })
    .catch(next);
});
router.post("/", (req, res, next) => {
  Resource.postResource(req.body)
    .then((resource) => {
      res.status(201).json(resource);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: "something went wrong inside the router",
    message: err.message,
  });
});

module.exports = router;