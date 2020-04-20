const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const orderController = require('../controllers').order;
const workerController = require('../controllers').worker;
const customerController = require('../controllers').customer;
const vehicleController = require('../controllers').vehicle;
const semiTrailerController = require('../controllers').semiTrailer;
const authController = require('../controllers/auth');
/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Express' });

});
/* Auth Router*/
router.post('/api/login',authController.login);
/* Orders Router */
router.get('/api/orders',orderController.list);
router.get('/api/orders/:id',orderController.getById);
router.post('/api/orders', auth,orderController.add);
router.put('/api/orders/:id',orderController.update);
router.delete('/api/orders/:id',[auth,role],orderController.delete);

/* Worker Router */
router.get('/api/workers/me',auth,workerController.getUserData);
router.get('/api/workers',workerController.list);
router.get('/api/workers/:id',workerController.getById);
router.post('/api/workers',workerController.add);
router.put('/api/workers/:id',workerController.update);
router.delete('/api/workers/:id',[auth,role],workerController.delete);

/* Customer Router */
router.get('/api/customers',customerController.list);
router.get('/api/customers/:id',customerController.getById);
router.post('/api/customers',customerController.add);
router.put('/api/customers/:id',customerController.update);
router.delete('/api/customers/:id',customerController.delete);

/* Vehicles Router */
router.get('/api/vehicles',vehicleController.list);
router.get('/api/vehicles/:id',vehicleController.getById);
router.post('/api/vehicles',vehicleController.add);
router.put('/api/vehicles/:id',vehicleController.update);
router.delete('/api/vehicles/:id',vehicleController.delete);

/* SemiTrailers Router */
router.get('/api/semiTrailers',semiTrailerController.list);
router.get('/api/semiTrailers/:id',semiTrailerController.getById);
router.post('/api/semiTrailers',semiTrailerController.add);
router.put('/api/semiTrailers/:id',semiTrailerController.update);
router.delete('/api/semiTrailers/:id',semiTrailerController.delete);


module.exports = router;
