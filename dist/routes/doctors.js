"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = __importDefault(require("../controller/doctorController"));
// import {createDoctor, getAllDoctors, getOneDoctor, updateDoctor, deleteDoctor} from '../controller/doctorController' 
const router = express_1.default.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/register', doctorController_1.default.registerDoctor);
router.post('/login', doctorController_1.default.loginDoctor);
router.get('/read', doctorController_1.default.getAllDoctors);
router.get('/:id', doctorController_1.default.getOneDoctor);
router.put('/:id', doctorController_1.default.updateDoctor);
router.delete('/:id', doctorController_1.default.deleteDoctor);
exports.default = router;
