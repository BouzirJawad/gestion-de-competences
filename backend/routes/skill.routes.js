const express = require("express")
const router = express.Router()
const skillController = require("../controllers/skill.controller")

router.post("/create", skillController.createSkill)
router.get("/", skillController.getSkills)
router.get("/:id", skillController.getSkill)
router.get("/code/:code", skillController.getSkillByCode)
router.put("/update/:id", skillController.updateSkill)
router.patch("/subskill/:skillId/:subSkillTitle", skillController.updateSubSkill)
router.delete("/delete/:id", skillController.deleteSkill)

router.get("/test", (req, res) => {
    res.send("test working")
})

module.exports = router
