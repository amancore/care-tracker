// src/middlewares/error.middleware.js

function errorHandler(err, req, res, next) {
    console.error(err.stack);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: Object.values(err.errors).map(e => e.message).join(', ')
        });
    }

    // JWT auth errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expired' });
    }

    // Multer file‑upload errors
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ success: false, message: 'Unexpected file field' });
    }

    // Fallback to 500
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
}

module.exports = { errorHandler };
