import express from 'express';

const router = express.Router();
import {auth} from '../middleware/auth.js';
import role from '../middleware/role.js';
import {authController,customerController,orderController,semiTrailerController,vehicleController,workerController} from '../controllers/index.js';


/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Witaj strona główna backend')
});
/* Auth Router*/
router.post('/api/login', authController.login);
/* Orders Router */
router.get('/api/orders/:page', orderController.list);
router.get('/api/order/:id', orderController.getById);
router.post('/api/orders', auth, orderController.add);
router.put('/api/order/:id', orderController.update);
router.delete('/api/orders/:id', [auth, role], orderController.orderDelete);

/* Worker Router */
router.get('/api/workers/me', auth, workerController.getUserData);
router.get('/api/workers/:page', workerController.list);
router.get('/api/workers/worker/:id', workerController.getById);
router.post('/api/workers', workerController.add);
router.put('/api/workers/:id', auth, workerController.update);
router.delete('/api/workers/:id', [auth, role], workerController.workerDelete);

/* Customer Router */
router.get('/api/customers/:page', customerController.list);
router.get('/api/customer/:id', customerController.getById);
router.post('/api/customers', customerController.add);
router.put('/api/customer/:id', customerController.update);
router.delete('/api/customers/:id', customerController.customerDelete);

/* Vehicles Router */
router.get('/api/vehicles/:page', auth, vehicleController.list);
router.get('/api/vehicle/:id', vehicleController.getById);
router.post('/api/vehicles', vehicleController.add);
router.put('/api/vehicle/:id', vehicleController.update);
router.delete('/api/vehicles/:id', vehicleController.vehicleDelete);

/* SemiTrailers Router */
router.get('/api/semiTrailers/:page', semiTrailerController.list);
router.get('/api/semiTrailer/:id', semiTrailerController.getById);
router.post('/api/semiTrailers', semiTrailerController.add);
router.put('/api/semiTrailer/:id', semiTrailerController.update);
router.delete('/api/semiTrailers/:id', semiTrailerController.semiTrailerDelete);


export default router;
