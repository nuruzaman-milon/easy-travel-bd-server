const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");

const UserModel = new mongoose.model("UserModel", userSchema);

// get all user route
router.get("/", async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    if (allUsers) {
      res.status(200).send(allUsers);
    } else {
      res.status(404).send({ message: "users not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "serversite error occured" });
  }
});

// get a user route based on specific email
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const specificUser = await UserModel.findOne({ email });
    if (specificUser) {
      res.status(200).send(specificUser);
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "serversite error occured" });
  }
});

//insert a user route
// router.post("/", async (req, res) => {
//   try {
//     const newUser = new UserModel(req.body);
//     await newUser.save((err) => {
//       if (!err) {
//         res.status(201).send({ message: "new user created successfully" });
//       } else {
//         res.status(500).send({ message: "User not created" });
//       }
//     });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

router.post("/", async (req, res) => {
  try {
    const user = req.body;
    const query = { email: user?.email };

    const allUsers = await UserModel.find(query);

    if (allUsers.length) {
      return res.send(allUsers);
    }

    const newUser = new UserModel(user);
    await newUser.save((err) => {
      if (!err) {
        res.status(201).send({ message: "new user created successfully" });
      } else {
        res.status(500).send({ message: "User not created" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// update a user route
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;

    const updateUser = await UserModel.updateOne(
      { _id: id },
      {
        $set: user,
      }
    );

    if (updateUser) {
      res.status(200).send({
        message: " user updated successfully",
        data: updateUser,
      });
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
