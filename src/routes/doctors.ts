import express from 'express';
import controller from '../controller/doctorController';
// import {createDoctor, getAllDoctors, getOneDoctor, updateDoctor, deleteDoctor} from '../controller/doctorController' 
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', controller.registerDoctor)

router.post('/login', controller.loginDoctor)

router.get('/read', controller.getAllDoctors)

router.get('/:id', controller.getOneDoctor)

router.put('/:id', controller.updateDoctor)

router.delete('/:id', controller.deleteDoctor)


export default router;
