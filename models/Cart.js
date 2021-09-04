const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: "Users", required: true },
    item: [
      { type: Schema.ObjectId, ref: "Product", required: true },
      { quantity: { type: Number, required: true } },
    ],
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamp: true }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
