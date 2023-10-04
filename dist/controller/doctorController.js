"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const doctorModel_1 = __importDefault(require("../model/doctorModel"));
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const controller = {
    //Register doctor
    registerDoctor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // validate with joi
            const validation = utils_1.registerDoctorSchema.validate(req.body, utils_1.options);
            if (validation.error) {
                return res.status(400).json({ Error: validation.error.details[0].message });
            }
            //Hash password
            const passwordHash = yield bcryptjs_1.default.hash(req.body.password, 8);
            //check if user exist
            const doctorExist = yield doctorModel_1.default.findOne({ email: req.body.email });
            if (doctorExist) {
                return res.status(400).json({
                    error: "Email already exist"
                });
            }
            const newDoctor = new doctorModel_1.default({
                name: req.body.name,
                email: req.body.email,
                password: passwordHash,
                specialization: req.body.specialization,
                gender: req.body.gender,
                phone: req.body.phone
            });
            const savedDoctor = yield newDoctor.save();
            res.status(201).json({
                data: savedDoctor
            });
        }
        catch (error) {
            res.status(400).json({ error: 'failed to register doctor' });
        }
    }),
    //Login Doctor
    loginDoctor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const validation = utils_1.loginDoctorSchema.validate(req.body, utils_1.options);
            if (validation.error) {
                return res.status(400).json({ Error: validation.error.details[0].message });
            }
            const doctor = yield doctorModel_1.default.findOne({ email: req.body.email });
            if (!doctor) {
                return res.status(400).json({
                    error: "Doctor does not exist, kindly register!!"
                });
            }
            const validPass = yield bcryptjs_1.default.compare(req.body.password, doctor.password);
            if (!validPass) {
                return res.status(400).json({
                    error: "invalid password"
                });
            }
            else {
                //generate token
                const token = jsonwebtoken_1.default.sign({ _id: doctor === null || doctor === void 0 ? void 0 : doctor._id }, process.env.JWT_TOKEN, { expiresIn: "30d" });
                // res.cookie('token', token, {httpOnly:true, maxAge: 30 * 24 * 60 * 60 * 1000})
                res.status(201).header('auth-token', token).json({
                    msg: "login successfully",
                    doctor,
                    token
                });
            }
        }
        catch (error) {
            res.status(400).json({ error: 'failed to login doctor' });
        }
    }),
    //Get all doctors
    getAllDoctors: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allDoctors = yield doctorModel_1.default.find({});
            res.status(200).json({
                data: allDoctors
            });
        }
        catch (error) {
            res.status(400).json({ error: 'failed to get doctors' });
            console.error(error);
        }
    }),
    //Get one doctor
    getOneDoctor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const thisDoctor = yield doctorModel_1.default.findById(req.params.id);
            res.status(200).json({
                data: thisDoctor
            });
        }
        catch (error) {
            res.status(400).json({ error: 'failed to get this doctor' });
            console.error(error);
        }
    }),
    //Update doctor
    updateDoctor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const thisDoctor = yield doctorModel_1.default.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({
                data: thisDoctor
            });
        }
        catch (error) {
            res.status(400).json({ error: 'failed to update this doctor' });
            console.error(error);
        }
    }),
    //delete doctor
    deleteDoctor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const thisDoctor = yield doctorModel_1.default.findByIdAndDelete(req.params.id);
            if (!thisDoctor) {
                res.status(404).json({
                    msg: "No doctor found"
                });
            }
            else {
                res.status(200).json({
                    msg: "doctor deleted"
                });
            }
        }
        catch (error) {
            res.status(400).json({ error: 'failed to get this doctor' });
            console.error(error);
        }
    })
};
exports.default = controller;
