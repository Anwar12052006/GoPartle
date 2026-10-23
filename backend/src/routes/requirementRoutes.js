const express = require("express");
const router = express.Router();
const requirementController = require("../controllers/requirementController");

router.post("/", requirementController.createRequirement);
router.get("/", requirementController.getRequirements);
router.get("/:id", requirementController.getRequirementById);

module.exports = router;
