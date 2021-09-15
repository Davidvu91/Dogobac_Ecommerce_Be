const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    owner: { type: Schema.ObjectId, ref: "Users", required: true },
    status: {
      type: String,
      enum: ["inline", "pendding", "paid"],
      required: true,
      default: "inline",
    },
    isDeleted: { type: Boolean, default: false },
    items: {
      productId: { type: Schema.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;

// { type: Schema.ObjectId, ref: "Product", required: true },
// { quantity: { type: Number, required: true } },
// items: [
//   {
//     productId: { type: Schema.ObjectId, ref: "Product", required: true },
//     quantity: { type: Number, required: true },
//   },
// ],
