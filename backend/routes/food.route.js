const express = require("express");

const {
  getAllFoods,
  addFood,
  updateFood,
  deleteFood,
  getFoodById,
  getFoodDetails,
  searchFoods,
} = require("../controller/food.controller");

const authenticateUser = require("../middleware/auth.middleware");

const foodRouter = express.Router();

foodRouter.get("/", getAllFoods);
foodRouter.post("/", addFood);
foodRouter.get("/search", searchFoods);
foodRouter.get("/author/:author", getFoodById);
foodRouter.get("/:id", getFoodDetails);
foodRouter.put("/:id", updateFood);
foodRouter.delete("/:id", deleteFood);

module.exports = foodRouter;
