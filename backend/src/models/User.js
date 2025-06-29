const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:       { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    password:   { type: String, required: true },
    role:       { type: String, enum: ['patient','doctor'], default: 'patient' },
}, { timestamps: true });

userSchema.pre('save', async function() {
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function(pw) {
    return bcrypt.compare(pw, this.password);
};

module.exports = mongoose.model('User', userSchema);
