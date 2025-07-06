const mongoose = require('mongoose')

const subSkillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        default: undefined
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true
    },
}, { _id: false})

const skillSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        match: [/^C\d+$/,  "Code must start with 'C' followed by numbers only (e.g., C1, C2, C100)"]
    },
    title: {
        type: String,
        required: true
    },
    subSkills: {
        type: [subSkillSchema],
        required: true,
        validate: [arr => arr.length > 0, "At least one subSkill is required"]
    },
    isValid: {
        type: Boolean,
        default: undefined
    }
})

const skillModel = mongoose.model('Skill', skillSchema)

module.exports = skillModel