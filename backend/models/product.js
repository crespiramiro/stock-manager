const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: {type: String, required: true},
    description: { type: String },
    category: { type : String, required: true },
    quantity: {type: Number, default: 0},
    price: { type : Number, default: 0 },
    createdAt: { type : Date, default: Date.now },
    updatedAt: { type : Date, default: Date.now },
    managedBy: { type : String},
    image: { type: String },
    userId: { type: String }
});

const Product = model("Product", productSchema);

module.exports = Product;