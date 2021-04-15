const Tour =require('../models/tour');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const cloudinary = require('cloudinary');
const APIFeatures = require('../utils/apiFeatures');


// Create a new tour   =>  /api/v1/tour/new
exports.newTour = catchAsyncErrors(async (req, res, next) => {

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'tours'
        });
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }

    req.body.images = imagesLinks;

    const tour = await Tour.create(req.body);

    res.status(200).json({
        success: true,
        tour
    });
});
// Get searched  tour  =>  /api/v1/tour?keyword
exports.getTours = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 4;
    const toursCount = await Tour.countDocuments();

    const apiFeatures = new APIFeatures(Tour.find(), req.query)
        .search()

    let tours = await apiFeatures.query;
    let filteredToursCount = tours.length;

    apiFeatures.pagination(resPerPage);
    products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        resPerPage,
        toursCount,
        filteredToursCount,
        tours
    });

});
// Get single product details   =>   /api/v1/product/:id
exports.getSingleTour = catchAsyncErrors(async (req, res, next) => {

    const tour = await Tour.findById(req.params.id);

    if (!tour) {
        return next(new ErrorHandler('Product not found', 404));
    }


    res.status(200).json({
        success: true,
        tour
    })

})


async function getSelectedTours(tours, budget) {

    let selectedTours = [];

    tours.forEach(tour => {

        if(tour.silver.cost <= budget) {

            let tourBody = {
                tourId: tour._id,
                name: tour.name,
                description: tour.description,
                images: tour.images,
                details: tour.silver
            }

            selectedTours.push(tourBody);
        }

        if(tour.gold.cost <= budget) {

            let tourBody = {
                tourId: tour._id,
                name: tour.name,
                description: tour.description,
                images: tour.images,
               details: tour.gold
            }

            selectedTours.push(tourBody);
        }

        if(tour.platinum.cost <= budget) {

            let tourBody = {
                tourId: tour._id,
                name: tour.name,
                description: tour.description,
                images: tour.images,
                details: tour.platinum
            }

            selectedTours.push(tourBody)
        }
    })

    return selectedTours
}

// Get searched by budget  tour  =>  /api/v1/tours/search/10000
exports.getToursByBudget = catchAsyncErrors(async (req, res, next) => {
   
    const tours = await Tour.find();
    const budget = req.params.budget;

    const selectedTours = await getSelectedTours(tours, budget)

    res.status(200).json({
        success: true,
        selectedTours
    });

});