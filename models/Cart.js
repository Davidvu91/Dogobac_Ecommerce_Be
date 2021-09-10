const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: "Users", required: true },
    items: [
      {
        type: { type: Schema.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    status: {},
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;

// { type: Schema.ObjectId, ref: "Product", required: true },
// { quantity: { type: Number, required: true } },
