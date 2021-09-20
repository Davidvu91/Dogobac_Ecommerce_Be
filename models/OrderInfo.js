const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    owner: { type: Schema.ObjectId, ref: "Users", required: true },
    items: [{ type: Schema.ObjectId, ref: "Cart", required: true }],
    amount: { type: String, required: true },
    paymentMenthod: { type: String, default: "Thanh toán khi nhận hàng" },
    status: {
      type: String,
      enum: ["pending", "paid"],
      required: true,
      default: "pending",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
