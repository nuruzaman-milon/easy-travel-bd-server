const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const busProviderSchema = require("../schemas/busProviderSchema");

const BusProviderModel = new mongoose.model(
  "BusProviderModel",
  busProviderSchema
);

// get all user route
router.get("/", async (req, res) => {
  try {
    const allBusProvider = await BusProviderModel.find();
    if (allBusProvider) {
      res.status(200).send(allBusProvider);
    } else {
      res.status(404).send({ message: "bus provider not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "serversite error occured" });
  }
});

// get a user route based on specific email
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    // console.log(email);
    const specificUser = await BusProviderModel.findOne({ email });
    if (specificUser) {
      res.status(200).send(specificUser);
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "serversite error occured" });
  }
});

//   insert a bus provider information route
router.post("/", async (req, res) => {
  try {
    const busProvider = req.body;

    const newBusProvider = new BusProviderModel(busProvider);
    await newBusProvider.save((err) => {
      if (!err) {
        res.status(201).send({ message: "Bus provider created successfully" });
      } else {
        res.status(500).send({ message: "not created" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateUser = await BusProviderModel.updateOne(
      { _id: id },
      {
        $set: {
          isVerified: true,
        },
      }
    );

    if (updateUser) {
      res.status(200).send({
        message: " bus provider updated successfully",
        data: updateUser,
      });
    } else {
      res.status(404).send({ message: " not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// router.put("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = req.body;
//     const updateUser = await BusProviderModel.updateOne(
//       { _id: id },
//       {
//         $set: user,
//       }
//     );

//     if (updateUser) {
//       res.status(200).send({
//         message: " bus provider updated successfully",
//         data: updateUser,
//       });
//     } else {
//       res.status(404).send({ message: " not found" });
//     }
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

module.exports = router;
