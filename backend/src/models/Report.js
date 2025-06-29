const { aiService } = require('../services/ai.service.js');

const preAnalyze = async (req, res, next) => {
    try {
        const { text } = req.body;
        const imagePath = req.file?.path;
        const result = await aiService.runPreAnalysis({ text, imagePath });
        res.json({ success: true, result });
    } catch (e) {
        next(e);
    }
};

module.exports = preAnalyze;
