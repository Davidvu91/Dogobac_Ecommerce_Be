const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    dimension: { type: String, required: true, trim: true },
    material: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, trim: true },
    averageRating: { type: Number },
    status: { type: String },
    category: {
      type: String,
      trim: true,
      required: true,
      enum: [
        "giường",
        "tủ áo",
        "sofa",
        "bàn ăn",
        "kệ tivi",
        "salon",
        "bàn trang điểm",
        "tủ giày",
      ],
    },
    quantity: { type: Number },
    shipping: { type: String },
    imageUrl: [{ type: String }],
    review: [{ type: Schema.ObjectId, ref: "Review" }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;

// Hoan chinh Product Model
