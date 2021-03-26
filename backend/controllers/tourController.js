const Tour =require('../models/tour');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const cloudinary = require('cloudinary');
const APIFeatures = require('../utils/apiFeatures');


// Create a new tour   =>  /api/v1/tour/new
exports.newTour = catchAsyncErrors(async (req, res, next) => {

    // let images = []
    // if (typeof req.body.images === 'string') {
    //     images.push(req.body.images);
    // } else {
    //     images = req.body.images
    // }

    // let imagesLinks = [];

    // for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //         folder: 'tours'
    //     });
    //     imagesLinks.push({
    //         public_id: result.public_id,
    //         url: result.secure_url,
    //     })
    // }

    // req.body.images = imagesLinks;

    const tour = await Tour.create(req.body);

    res.status(200).json({
        success: true,
        tour
    });
});
// Get searched  tour  =>  /api/v1/tour?keyyword
exports.getTours = catchAsyncErrors(async (req, res, next) => {
    // const resPerPage = 8;
    // const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Tour.find(), req.query)
        .search()

    let tours = await apiFeatures.query;
    // let filteredProductsCount = products.length;

    // apiFeatures.pagination(resPerPage);
    // products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        // resPerPage,
        // productsCount,
        // filteredProductsCount,
        tours
    });

});