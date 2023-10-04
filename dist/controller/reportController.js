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
const reportModel_1 = __importDefault(require("../model/reportModel"));
const controller = {
    createReport: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newPatient = new reportModel_1.default(req.body);
            console.log('patient created');
            yield newPatient.save();
            res.status(201).json({
                data: newPatient
            });
        }
        catch (error) {
            res.status(400).json({ error: 'failed to create patient' });
            console.error(error);
        }
    }),
    getAllReports: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allreports = yield reportModel_1.default.find({}).populate('doctor', 'doctor name');
            res.status(200).json({
                data: allreports
            });
        }
        catch (error) {
            res.status(400).json({ error: 'failed to get patients' });
            console.error(error);
        }
    }),
    getOneReport: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const thisReport = yield reportModel_1.default.findById(req.params.id).populate('doctor', 'doctor.name');
            if (thisReport) {
                res.status(200).json({
                    data: thisReport
                });
            }
            else {
                res.status(400).json({
                    msg: 'report not found'
                });
            }
        }
        catch (error) {
            res.status(400).json({ msg: 'failed to get this patient' });
            console.error(error);
        }
    }),
    updateReport: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const thisReport = yield reportModel_1.default.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({
                data: thisReport
            });
        }
        catch (error) {
            res.status(400).json({ error: 'failed to update this doctor' });
            console.error(error);
        }
    }),
    deleteReport: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const thisReport = yield reportModel_1.default.findByIdAndDelete(req.params.id);
            if (!thisReport) {
                res.status(404).json({
                    msg: "No patient found"
                });
            }
            else {
                res.status(200).json({
                    msg: "patient deleted"
                });
            }
        }
        catch (error) {
            res.status(400).json({ error: 'failed to get this patient' });
            console.error(error);
        }
    })
};
exports.default = controller;
