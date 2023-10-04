"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reportController_1 = __importDefault(require("../controller/reportController"));
const auth_1 = require("../auth/auth");
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/create', auth_1.auth, reportController_1.default.createReport);
router.get('/read', auth_1.auth, reportController_1.default.getAllReports);
router.get('/:id', auth_1.auth, reportController_1.default.getOneReport);
router.put('/:id', auth_1.auth, reportController_1.default.updateReport);
router.delete('/:id', auth_1.auth, reportController_1.default.deleteReport);
exports.default = router;
