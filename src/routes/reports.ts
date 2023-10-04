import express from 'express';
import controller from '../controller/reportController';
import { auth } from '../auth/auth';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create', auth,  controller.createReport)

router.get('/read', auth, controller.getAllReports)

router.get('/:id', auth, controller.getOneReport)

router.put('/:id', auth, controller.updateReport)

router.delete('/:id', auth, controller.deleteReport)

export default router;
