const Joi = require('joi');

const runNetworkScriptSchema = Joi.object({
    filename: Joi.string().required(),
    mode: Joi.string().required(),
    answers: Joi.array().items(Joi.string()).default([])
});

const runScriptSchema = Joi.object({
    filename: Joi.string().required(),
    answers: Joi.array().items(Joi.string()).default([])
});

const runChaincodeMainSchema = Joi.object({
    channelName: Joi.string().required()
});

const updateChaincodeParamsSchema = Joi.object({
    updates: Joi.object().required()
});

module.exports = {
    runNetworkScriptSchema,
    runScriptSchema,
    runChaincodeMainSchema,
    updateChaincodeParamsSchema
};