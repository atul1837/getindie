var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
name: String,
price: Number,
image: String,
description: String,
category: String
// id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("product", productSchema);



