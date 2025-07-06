const Skill = require('../models/skill')
const computeSkillValidity = require("../helpers/computeSkillValidity")

const createSkill = async (req, res) => {
    try {
        const { code, title, subSkills } = req.body

        const skill = await Skill.findOne({ title:title, code:code })

        if(skill) {
            return res.status(404).json({message: "Skill already exist"})
        }

        const newSkill = new Skill({
            code,
            title,
            subSkills
        })

        await newSkill.save()
        res.status(201).json({ message: "Skill created successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find()

        if (skills.length === 0) {
            return res.status(404).json({ message: "No skills to display"})
        }

        res.status(201).json({skills})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id)

        if (!skill) {
            return res.status(404).json({ message: "Skill not found"})
        }

        res.status(201).json(skill)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

const updateSkill = async (req, res) => {
    try {
        const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, { $set: req.body}, { new: true, runValidators: true })

        if (!updatedSkill) {
            return res.status(404).json({ error: "Skill not found" })
        }

        res.status(201).json(updatedSkill)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateSubSkill = async (req, res) => {
  const { skillId, subSkillTitle } = req.params;
  const { isValid } = req.body;

  try {
    const skill = await Skill.findById(skillId);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });

    const subSkill = skill.subSkills.find(sub => sub.title === subSkillTitle);
    if (!subSkill) return res.status(404).json({ message: 'SubSkill not found' });

    subSkill.isValid = isValid;

    skill.isValid = computeSkillValidity(skill.subSkills);

    await skill.save();

    res.json({ message: "SubSkill updated", skill });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById({ _id: req.params.id })

        if (!skill) {
            return res.status(404).json({ error: "Skill not found" })
        }

        await Skill.findByIdAndDelete(req.params.id)
        res.status(201).json({ message: "Skill deleted successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { createSkill, getSkills, getSkill, updateSkill, updateSubSkill, deleteSkill }
