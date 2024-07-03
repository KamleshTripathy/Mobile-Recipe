const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
});
const UserModel = mongoose.model("UserData", userSchema);
module.exports = {
  UserModel,
};
