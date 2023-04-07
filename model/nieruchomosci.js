const mongoose = require('mongoose');
const propertySchema = new mongoose.Schema({
    id:{
        type:Number,
    },
    code:{
        type:String,
    },
    favorites:{
        type:Boolean,
    },
    recomended:{
        type:Boolean,
    },
    city: {
        type: String
    },
    title:{
        type:String,
    },
    market:{
        type:String,
    },
    type:{
        type:String,
    },
    bathrooms:{
        type:Number,
    },
    bedrooms:{
        type:Number,
    },
    garden:{
        type:Boolean,
    },
    parking:{
        type:Boolean,
    },
    taras :{
        type:Boolean,
    },
    balcony:{
        type:Boolean,
    },
    price:{
        type:Number,
    },
    localization:{
        type:String,
    },
    meters:{
        type:Number,
    },
    description: {
        type:String,
    },
    owner: {
        type:String,
    },
    image:{
        
    }
})

const Propertypoland = mongoose.models.Propertypoland || mongoose.model('Propertypoland', propertySchema);
export default Propertypoland;