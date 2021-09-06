const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    dimension: { type: String, required: true, trim: true },
    material: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, trim: true },
    status: { type: String },
    category: { type: String, required: true, trim: true },
    quantity: { type: Number },
    shipping: { type: String },
    imageUrl: [{ type: String, required: true }],
    review: [{ type: Schema.ObjectId, ref: "Review" }],

    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamp: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;

// Hoan chinh Product Model
// category: {
//   type: String,
//   trim: true,
//   required: true,
//   enum: [
//     "bed",
//     "closet",
//     "sofa",
//     "dining table",
//     "tv shelf",
//     "salon",
//     "dressing table",
//     "shoe cabinet",
//   ],
// },
