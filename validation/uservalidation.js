const Joi = require('joi')

const userValidation = ( body) => {
    const userSchema = Joi.object({
        firstname: Joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/).min(2).max(30).required(),
        lastname: Joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/).min(2).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,30}$')).required(),
        storeId: Joi.number().allow(null), 
        cp: Joi.number().integer().min(10000).max(99999).allow(null, ''),
        genre: Joi.string().valid('femme', 'homme', 'nbinaire').allow(null, ''),
        date_naissance: Joi.date().allow("", null).max('now'),
        idSUN: Joi.alternatives().try(
            Joi.string().allow('').optional(),
            Joi.string().regex(/^[0-9]{5}$/).optional()
        ).label('idSun'),
        role: Joi.string().valid('client', 'SUNcollaborateur', 'invite','gestionnaire','employe').required(),
        telephone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).allow('', null).optional(),
    })
    return userSchema.validate(body)
}

const passwordUpdateValidation = (data) => {
    const schema = Joi.object({
        userId: Joi.number().required(),
        newPassword: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,30}$')).required(),
    });

    return schema.validate(data);
};

module.exports = {userValidation, passwordUpdateValidation } 