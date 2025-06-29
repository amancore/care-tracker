const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, user: { id: user._id, email: user.email, role: user.role } });
    } catch (e) { next(e); }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await user.comparePassword(password))
            return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({ success: true, token });
    } catch (e) { next(e); }
};

module.exports = {
    register,
    login
};
