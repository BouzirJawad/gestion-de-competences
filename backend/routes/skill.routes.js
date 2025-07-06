const express = require("express")
const router = express.Router()
const skillController = require("../controllers/skill.controller")

router.post("/create", skillController.createSkill)
router.get("/", skillController.getSkills)
router.get("/:id", skillController.getSkill)
router.put("/delete", skillController.updateSkill)
router.patch("/:skillId/subskills/:subSkillTitle", skillController.updateSubSkill)
router.delete("/delete", skillController.deleteSkill)

router.get("/test", (req, res) => {
    res.send("test working")
})

module.exports = router
