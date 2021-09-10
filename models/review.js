const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    owner: { type: Schema.ObjectId, ref: "Users", required: true },
    targetProduct: { type: Schema.ObjectId, ref: "Product", required: true },
    content: { type: String, default: "" },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
