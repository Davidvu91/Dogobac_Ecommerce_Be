const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const { AppError } = require("../helpers/utilhelper");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: Number, required: true, default: 0 },
    address: { type: String, default: "", trim: true },
    cart: [{ type: Schema.ObjectId, ref: "Cart" }],
    order: [{ type: Schema.ObjectId, ref: "Order" }],
    review: [{ type: Schema.ObjectId, ref: "Review" }],
    avataUrl: {
      type: String,
      trim: true,
      default:
        "https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png",
    },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);

UserSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};

const Users = mongoose.model("Users", UserSchema);

//hash plain password before create an Admin:
// const plainPassword = "david123";
// const saltRounds = 10;
// const hash = bcrypt.hashSync(plainPassword, saltRounds);

// Create an Amin of the Application:
// const Admin = new Users({
//   name: "David",
//   email: "david@example.com",
//   password: hash,
//   role: 2,
//   address: "Vungtau City",
//   avataUrl:
//     "https://scontent.fvca1-4.fna.fbcdn.net/v/t1.6435-9/166712516_239728601170584_1469724544531488164_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=174925&_nc_ohc=agD1u-TxDOQAX9om2Ja&_nc_ht=scontent.fvca1-4.fna&oh=4df7749f8b8294cd7870a433dffcae41&oe=615BD77B",
// });

// Admin.save(async (err) => {
//   if (err) return new AppError(400, "create admin fail", "server error");
// });

// console.log("haha, new admin", Admin);

module.exports = Users;
