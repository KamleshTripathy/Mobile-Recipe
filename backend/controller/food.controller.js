const FoodModel = require("../model/food.model");

const getAllFoods = async (req, res) => {
  try {
    let foods;
    if (req.query.limit) {
      // If a limit is provided in the query parameters, limit the fetch
      foods = await FoodModel.find().limit(parseInt(req.query.limit));
    } else {
      // If no limit is provided, fetch all foods
      foods = await FoodModel.find();
    }
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addFood = async (req, res) => {
  try {
    let food = await FoodModel.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await FoodModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (food) {
      res.status(200).json(food);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid Id" });
    } else {
      res.status(500).json(error);
    }
  }
};

const getFoodById = async (req, res) => {
  try {
    const { author } = req.params;
    console.log(author);
    const food = await FoodModel.find({ author: author });
    if (food.length > 0) {
      res.status(200).json(food);
    } else {
      res
        .status(404)
        .json({ message: "Record not found. Check ID and try again." });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid Id" });
    } else {
      res.status(500).json(error);
    }
  }
};

const getFoodDetails = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const food = await FoodModel.find({ _id: id });
    if (food.length > 0) {
      res.status(200).json(food);
    } else {
      res
        .status(404)
        .json({ message: "Record not found. Check ID and try again." });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid Id" });
    } else {
      res.status(500).json(error);
    }
  }
};

const searchFoods = async (req, res) => {
  try {
    const { searchString } = req.query;
    let foods;
    if (searchString) {
      // If searchString is provided, search for foods containing the string or substring
      foods = await FoodModel.find({
        $or: [
          { foodname: { $regex: searchString, $options: "i" } }, // Case-insensitive search for name
          { description: { $regex: searchString, $options: "i" } }, // Case-insensitive search for description
        ],
      });
    } else {
      // If no searchString is provided, return all foods
      foods = await FoodModel.find();
    }
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await FoodModel.findOneAndDelete({ _id: id });
    if (food) {
      res.status(200).json(food);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid Id" });
    } else {
      res.status(500).json(error);
    }
  }
};

module.exports = {
  getAllFoods,
  addFood,
  updateFood,
  deleteFood,
  getFoodById,
  getFoodDetails,
  searchFoods,
};
