const Workout = require("../models/workoutModel.js");
const mongoose = require("mongoose");

// get all wo
const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const wos = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(wos);
};

//get single wo
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id" });
  }
  const wo = await Workout.findById(id);
  if (!wo) {
    return res.status(404).json({ error: "Id not found" });
  }
  res.status(200).json(wo);
};

//create wo
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  let emptyFields = [];
  !title && emptyFields.push("title");
  !load && emptyFields.push("load");
  !reps && emptyFields.push("reps");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in the blank fields", emptyFields });
  }
  try {
    console.log({ req_user: req.user._id });
    const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete wo
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id" });
  }

  const wo = await Workout.findByIdAndDelete(id);
  if (!wo) {
    return res.status(404).json({ error: "Id not found" });
  }
  res.status(200).json(wo);
};

//update wo

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid id" });
  }

  const wo = await Workout.findByIdAndUpdate(id, { ...req.body });
  if (!wo) {
    return res.status(404).json({ error: "Id not found" });
  }
  res.status(200).json(wo);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
