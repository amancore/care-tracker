const Report = require('../models/Report.js');

const listReports = async (req, res, next) => {
    const reports = await Report.find({ user: req.user.id });
    res.json({ success: true, reports });
};

const updateReport = async (req, res, next) => {
    const report = await Report.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true }
    );
    res.json({ success: true, report });
};

const deleteReport = async (req, res, next) => {
    await Report.deleteOne({ _id: req.params.id, user: req.user.id });
    res.json({ success: true });
};

module.exports = {
    listReports,
    updateReport,
    deleteReport
};
