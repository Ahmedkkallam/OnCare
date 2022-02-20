const express = require("express");
const router = express.Router();

const db = require("../config/database");
const User = require("../models/User");

// Read All
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    let user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    user.password = undefined;
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email, password: req.body.password },
    });
    if (user === null) {
      const error = new Error();
      error.name = "NotFoundError";
      error.message = "We couldn't find the quiz you are looking for.";
      throw error;
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const error = new Error();
    error.name = "NotFoundError";
    error.message = "We couldn't find the user you are looking for.";

    const user = await User.findByPk(req.params.id);

    if (!user) throw error;

    await user.destroy();
    res.status(201).json();
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update
router.patch("/:id", async (req, res) => {
  try {
    const error = new Error();
    error.name = "NotFoundError";
    error.message = "We couldn't find the user you are looking for.";

    let user = await User.findByPk(req.params.id);

    if (!user) throw error;

    await user.update({ ...req.body });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
