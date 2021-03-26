const mongoose = require('mongoose');


const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name.'],
        maxlength: [50, 'City name can not exceed 50 characters.'],
    },
    description: {
        type: String,
        required: [true, 'Please enter description.'],
        maxlength: [500, 'City description can not exceed 500 characters.'],
    },
    images: [{
        
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
    }],
    silver:{
        breakfast:Boolean,
        lunch: Boolean,
        dinner:Boolean,
        roomType:{
            type: String,
            enum:{
                values:[
                    'economy class',
                    'business class',
                    'first class',
                ]
            }
        },
        transport:{
            type: Boolean,
            required: true
        },
        cost:{
            type: Number,
            required: [true, "please enter price for silver"]
        }
    },
    gold:{
        breakfast:Boolean,
        lunch: Boolean,
        dinner:Boolean,
        roomType:{
            type: String,
            enum:{
                values:[
                    'economy class',
                    'business class',
                    'first class',
                ]
            }
        },
        transport:{
            type: Boolean,
            required: true
        },
        cost:{
            type: Number,
            required: [true, "please enter price for silver"]
        }
    },
    platinum:{
        breakfast:Boolean,
        lunch: Boolean,
        dinner:Boolean,
        roomType:{
            type: String,
            enum:{
                values:[
                    'economy class',
                    'business class',
                    'first class',
                ]
            }
        },
        transport:{
            type: Boolean,
            required: true
        },
        cost:{
            type: Number,
            required: [true, "please enter price for silver"]
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Tour',tourSchema);