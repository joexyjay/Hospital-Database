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
exports.resolvers = void 0;
const doctorModel_1 = __importDefault(require("../model/doctorModel"));
const reportModel_1 = __importDefault(require("../model/reportModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.resolvers = {
    Query: {
        doctors: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const doctors = yield doctorModel_1.default.find({});
                if (!doctors || doctors.length === 0) {
                    throw new Error('No doctors found');
                }
                return doctors;
            }
            catch (error) {
                console.error('Error fetching doctors', error);
                throw new Error('An error occured while fetching doctors');
            }
        }),
        doctor: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const id = args.input.id;
                const doctor = yield doctorModel_1.default.findById(id);
                if (!doctor) {
                    throw new Error('doctor not found');
                }
                return doctor;
            }
            catch (error) {
                console.error('Error fetching this doctor', error);
                throw new Error('An error occured while fetching this doctor');
            }
        }),
        reports: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const reports = yield reportModel_1.default.find({});
                if (!reports || reports.length === 0) {
                    throw new Error('Reports not found');
                }
                return reports;
            }
            catch (error) {
                console.error('Error fetching reports', error);
                throw new Error('An error occured while fetching reports');
            }
        }),
        report: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const id = args.input.id;
                const report = yield reportModel_1.default.findById(id);
                if (!report) {
                    throw new Error('this report not found');
                }
                return report;
            }
            catch (error) {
                console.error('Error fetching this report', error);
                throw new Error('An error occured while fetching this report');
            }
        })
    },
    Mutation: {
        registerDoctor: (_parent, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { password, email, name, specialization, gender, phone } = input;
                //Hash Password
                const passwordHash = yield bcryptjs_1.default.hash(password, 8);
                const doctorExist = yield doctorModel_1.default.findOne({ email: email });
                if (doctorExist) {
                    throw new Error('email alreay exist');
                }
                const newDoctor = new doctorModel_1.default({
                    name,
                    email,
                    password: passwordHash,
                    specialization,
                    gender,
                    phone
                });
                const doctor = yield newDoctor.save();
                return doctor;
            }
            catch (error) {
                console.error('Error creating doctor', error);
                throw new Error('An error occured while trying to create doctor');
            }
        }),
        loginDoctor: (_parent, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const doctor = yield doctorModel_1.default.findOne({ email: input.email });
                if (!doctor) {
                    throw new Error('Email does not exist');
                }
                const validPass = yield bcryptjs_1.default.compare(input.password, doctor.password);
                if (!validPass) {
                    throw new Error('Invalid Password');
                }
                else {
                    return doctor;
                }
            }
            catch (error) {
                console.error('Error login doctor', error);
                throw new Error('An error occured while trying to login doctor');
            }
        }),
        updateDoctor: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id, password, email, name, specialization, gender, phone } = args.input;
                const input = {
                    name,
                    email,
                    password,
                    specialization,
                    gender,
                    phone
                };
                const doctor = yield doctorModel_1.default.findByIdAndUpdate(id, input);
                return doctor;
            }
            catch (error) {
                console.error('Error updating doctor', error);
                throw new Error('An error occured while trying to modify doctor');
            }
        }),
        deleteDoctor: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id } = args.input;
                const doctor = yield doctorModel_1.default.findByIdAndDelete(id);
                if (doctor) {
                    return {
                        status: true
                    };
                }
            }
            catch (error) {
                console.error('Error deleting doctor', error);
                throw new Error('An error occured while trying to delete doctor');
            }
        }),
        createReport: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { patientName, age, hospital, weight, height, bloodGroup, genotype, bloodPressure, HIV_status, hepatitis, doctor } = args.input;
                const newReport = new reportModel_1.default({
                    patientName,
                    age,
                    hospital,
                    weight,
                    height,
                    bloodGroup,
                    genotype,
                    bloodPressure,
                    HIV_status,
                    hepatitis,
                    doctor
                });
                const report = yield newReport.save();
                return report;
            }
            catch (error) {
                console.error('Error creating report', error);
                throw new Error('An error occured while trying to create report');
            }
        }),
        updateReport: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id, patientName, age, hospital, weight, height, bloodGroup, genotype, bloodPressure, HIV_status, hepatitis } = args.input;
                const input = {
                    patientName,
                    age,
                    hospital,
                    weight,
                    height,
                    bloodGroup,
                    genotype,
                    bloodPressure,
                    HIV_status,
                    hepatitis,
                };
                const report = yield reportModel_1.default.findByIdAndUpdate(id, input);
                return report;
            }
            catch (error) {
                console.error('Error updating report', error);
                throw new Error('An error occured while trying to modify report');
            }
        }),
        deleteReport: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id } = args.input;
                const report = yield reportModel_1.default.findByIdAndDelete(id);
                if (report) {
                    return {
                        status: true
                    };
                }
            }
            catch (error) {
                console.error('Error deleting report', error);
                throw new Error('An error occured while trying to delete report');
            }
        })
    }
};
