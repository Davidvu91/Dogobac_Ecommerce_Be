const mongoose = require("mongoose");
const Order = require("../models/OrderInfo");
const Users = require("../models/User");

const orderController = {};

//CREATE AN ORDER:

orderController.createOrder = async (req, res, next) => {
  const owner = req.userId;
  const { paymentMenthod, amount, items } = req.body;

  //check if enough data?
  if (!owner || !items || !amount) {
    return res.status(403).json({ error: "not enough data" });
  }
  //check if userId and productId isvalid?
  if (!mongoose.Types.ObjectId.isValid(owner)) {
    return res.status(403).json({ error: "User not found" });
  }

  // create an Order:
  let order = await Order.create({
    owner: owner,
    items: [...items],
    paymentMenthod,
    amount,
  });

  // Update user:
  let user = await Users.findById(owner);
  user = await Users.findByIdAndUpdate(
    owner,
    {
      order: [...user.order, order._id],
    },
    { new: true }
  );
  return res
    .status(200)
    .json({ user, order, message: "create an order successfully" });
};

//GET ALL ORDERS:
orderController.getAllOrder = async (req, res, next) => {
  let data = await Order.find().populate("owner");
  if (data.length === 0) {
    return res.status(403).json({ error: "No Order founded" });
  }
  let totalOrder = await Order.count();
  console.log("tong so Orders la:", totalOrder);
  return res
    .status(200)
    .json({ data, totalOrder, message: "You get all orders successfully" });
};

// UPDATE STATUS OF SINGLE ORDER:
orderController.updateStatusOfOrder = async (req, res, next) => {
  const { orderId } = req.params;
  console.log("this is the orderId:", orderId);
  const status = req.body.status;
  console.log("the status has been changed to:", status);

  // check if orderId is valid?
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(403).json({ error: "OrderId is not valid" });
  }
  let order = await Order.findById(orderId);
  if (!order) {
    return res.status(403).json({ error: "Order not found" });
  }
  if (!status) {
    return res.status(300).json({ error: "No Thing change to update order" });
  }

  order = await Order.findByIdAndUpdate(
    orderId,
    { status: status },
    { new: true }
  );
  return res
    .status(200)
    .json({ order, message: "update status order successfully" });
};

module.exports = orderController;
