const mongoose = require("mongoose");

const estateSaleSchema = new mongoose.Schema({
propertyType: { type: String, required: true },
location: { type: String, required: true },
price: {type:Number, required: true },
description: { type: String },
propertyAvail: { type: String }, 
});

const Sale = mongoose.model("Sale", estateSaleSchema );
module.exports = Sale;