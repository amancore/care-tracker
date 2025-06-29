// src/middlewares/upload.middleware.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ensure the uploads directory exists
const UPLOADS_FOLDER = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

// configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        // e.g. "image-1627389123456.png"
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext)
                                     .toLowerCase()
                                     .replace(/\s+/g, '-')
                                     .replace(/[^a-z0-9\-]/g, '');
        cb(null, `${base}-${timestamp}${ext}`);
    }
});

// only accept images
const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg|jpg|png|gif)'));
    }
};

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,   // max 5 MB per file
        files: 1                     // only 1 file per request
    }
});
