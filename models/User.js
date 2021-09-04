const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: Number, default: 0 },
    address: { type: String, default: "", trim: true },
    cart: [{ type: Schema.ObjectId, ref: "Cart" }],
    review: [{ type: Schema.ObjectId, ref: "Review" }],
    avataUrl: {
      type: String,
      trim: true,
      default:
        "https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png",
    },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamp: true }
);

UserSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
