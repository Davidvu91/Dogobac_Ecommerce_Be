const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    content: { type: String, required: true },
    starpoint: {
      type: Number,
      required: true,
      enum: ["1", "2", "3", "4", "5"],
    },

    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamp: true }
);

const Reviews = mongoose.model("Reviews", ReviewSchema);
module.exports = Reviews;

// Hoan chinh Product Model
