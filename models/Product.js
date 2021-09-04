const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    dimension: { type: String, required: true, trim: true },
    material: { type: String, required: true, trim: true },
    productInfo: { type: String, required: true },
    Price: { type: Number, required: true, trim: true },
    status: { type: String, required: true },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
      required: true,
      trim: true,
    },

    imageUrl: [
      { imageUrl1: { type: String, required: true } },
      { imageUrl2: { type: String, required: true } },
      { imageUrl3: { type: String, required: true } },
    ],
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
