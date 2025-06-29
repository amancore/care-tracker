const Joi = require('joi');

function validateBody(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
        if (error) {
            return res.status(400).json({
                success: false,
                errors: error.details.map(d => ({ field: d.path.join('.'), message: d.message }))
            });
        }
        req.body = value;
        next();
    };
}

const registerSchema = Joi.object({
    name:     Joi.string().min(2).max(50).required(),
    email:    Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role:     Joi.string().valid('patient','doctor').optional()
});

const loginSchema = Joi.object({
    email:    Joi.string().email().required(),
    password: Joi.string().required()
});

const preAnalysisSchema = Joi.object({
    text: Joi.string().allow('').optional()
});

const reportAnalysisSchema = Joi.object({
    name:      Joi.string().min(1).max(100).required(),
    modelUsed: Joi.string().valid('modelA','modelB').required()
});

const updateReportSchema = Joi.object({
    name:      Joi.string().min(1).max(100).optional(),
    modelUsed: Joi.string().valid('modelA','modelB').optional(),
    analysis:  Joi.any().optional()
});

module.exports = {
    validateBody,
    registerSchema,
    loginSchema,
    preAnalysisSchema,
    reportAnalysisSchema,
    updateReportSchema
};
