const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: "Users", required: true },
    productId: { type: Schema.ObjectId, ref: "Products", required: true },
    content: { type: String, default: "" },
    rating: {
      type: Number,
      enum: ["1", "2", "3", "4", "5"],
      required: true,
    },

    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamp: true }
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
