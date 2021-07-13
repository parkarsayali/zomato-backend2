const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations');
const mealTypeController = require('../controllers/mealtypes');
const restaurantController = require('../controllers/restaurant');
const userController = require('../controllers/users');
const paymentGatewayController = require('../Controllers/PaymentGateway');
const orderController = require('../controllers/orders');


router.get('/locations', locationsController.getLocations);
router.post('/addLocation',locationsController.addLocation);

router.get('/mealtypes', mealTypeController.getMealTypes);

router.get('/restaurantsbylocation/:locationId',restaurantController.getRestaurantsByLocation);
router.post('/filter',restaurantController.filterRestaurants);
router.get('/restaurantbyid/:restaurantId',restaurantController.getRestaurantDetailsById)

router.get('/menuitemsbyrestaurant/:restaurantId', restaurantController.getMenuItemsByRestaurant);

router.post('/SignUp',userController.createUser);
router.post('/login',userController.authenticateUser);

router.post('/payment', paymentGatewayController.payment); 
router.post('/callback', paymentGatewayController.callback);

router.post('/orders',orderController.addOrderDetails);


module.exports = router;
// implementing routing concept
// based on request url cascading the request to desired controller method