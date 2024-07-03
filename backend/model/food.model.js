const mongoose = require("mongoose");
const foodSchema = mongoose.Schema({
  foodname: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  instruction: { type: String },
  time: { type: String, required: true },
  servings: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData",
    required: true,
  },
});

const FoodModel = mongoose.model("FoodData", foodSchema);
module.exports = FoodModel;
