const express = require('express');
const router = express.Router();
const { newTour, getTours, getToursByBudget,getSingleTour } =require('../controllers/tourController')


router.route('/admin/tour/new').post(newTour);
router.route('/tour').get(getTours);
router.route('/tour/:id').get(getSingleTour)
router.route('/tours/search/:budget').get(getToursByBudget);

module.exports = router;