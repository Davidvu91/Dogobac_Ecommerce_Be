const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    dimension: { type: String, required: true },
    material: { type: String, required: true },
    productInfo: { type: String, required: true },
    Price: { type: Number, required: true },
    status: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "bed",
        "closet",
        "sofa",
        "dining table",
        "tv shelf",
        "salon",
        "dressing table",
        "shoe cabinet",
      ],
    },
    imageUrl: [
      { imageUrl1: { type: String, required: true } },
      { imageUrl2: { type: String, required: true } },
      { imageUrl3: { type: String, required: true } },
    ],
    review: { type: Schema.ObjectId, ref: "review" },

    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamp: true }
);

const Products = mongoose.model("Products", ProductSchema);
module.exports = Products;

// Hoan chinh Product Model
