const express = require('express');
const router = express.Router();
const {newTour, getTours} =require('../controllers/tourController')


router.route('/tour/new').post(newTour);
router.route('/tour').get(getTours);

// Just comment

module.exports = router;