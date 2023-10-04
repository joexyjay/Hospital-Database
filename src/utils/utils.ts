import Joi from "joi";

export const registerDoctorSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().trim().lowercase().required().email(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.any().equal(Joi.ref('password')).required().label('Confirm_password').messages({'any.only':  '{{#label}} does not match'}),
    specialization: Joi.string().required(),
    gender: Joi.string().required(),
    phone: Joi.number().required()
})

export const options = {
    abortEarly: false,
    errors:{
        wrap:{
            label: ''
        }
    }
}

export const loginDoctorSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required().email(),
    password: Joi.string().min(6).required()
})