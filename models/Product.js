const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const ProductShema = new Schema(
  {
    name: { type: String, required: true },
    dimension: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "Còn Hàng" },
    isSaleOff: { type: Boolean, default: false },
    pictureUrl: {
      type: String,
      default: "",
    },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamp: true }
);

const User = mongoose.model("User", ProductShema);
