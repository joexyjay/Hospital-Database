"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDoctorSchema = exports.options = exports.registerDoctorSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerDoctorSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required().email(),
    password: joi_1.default.string().min(6).required(),
    confirm_password: joi_1.default.any().equal(joi_1.default.ref('password')).required().label('Confirm_password').messages({ 'any.only': '{{#label}} does not match' }),
    specialization: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
    phone: joi_1.default.number().required()
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
exports.loginDoctorSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required().email(),
    password: joi_1.default.string().min(6).required()
});
