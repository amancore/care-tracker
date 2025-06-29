const Report = require('../models/Report.js');
const aiService = require('../services/ai.service.js');

const createAnalysis = async (req, res, next) => {
    try {
        const { name, modelUsed } = req.body;
        const imagePath = req.file.path;

        const analysis = await aiService.runReportAnalysis({ name, imagePath, modelUsed });

        const report = await Report.create({
            user: req.user.id,
            name, imagePath, modelUsed, analysis
        });
        res.status(201).json({ success: true, report });
    } catch (e) { next(e) }
};

const getAnalysisById = async (req, res, next) => {
    try {
        const report = await Report.findById(req.params.id);
        res.json({ success: true, report });
    } catch (e) { next(e) }
};

module.exports = {
    createAnalysis,
    getAnalysisById
};
