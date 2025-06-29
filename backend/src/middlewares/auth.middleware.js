const jwt = require('jsonwebtoken');
module.exports.requireAuth = (roles = []) => (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (roles.length && !roles.includes(payload.role))
            return res.status(403).json({ success: false, message: 'Forbidden' });
        req.user = payload;
        next();
    } catch {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};
