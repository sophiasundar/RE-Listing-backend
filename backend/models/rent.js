const mongoose = require("mongoose");

const estateRentSchema = new mongoose.Schema({
propertyType: { type: String, required: true },
location: { type: String, required: true },
price: {type:Number, required: true },
description: { type: String },
propertyType: { type: String }, 
});

const Rent = mongoose.model("Rent", estateRentSchema );
module.exports = Rent;