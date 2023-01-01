const { format } = require('date-fns');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const availableBusTicketSchema = require('../schemas/availableBusTicketsSchema');

const AvailableBus = new mongoose.model('AvailableBus', availableBusTicketSchema);

// get all availble bus
//http://localhost:5000/available-bus
router.get('/', async (req, res) => {
    try {
        const allavailableBus = await AvailableBus.find();
        if (allavailableBus) {
            res.status(200).send({
                success: true,
                message: "bus found successfully",
                data: allavailableBus
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "bus not found",
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "server error occured",
        })
        console.log(error);
    }
});
// get all from & to location 
//http://localhost:5000/available-bus/from-and-to
router.get('/from-and-to', async (req, res) => {
    try {
        const allavailablelocation = await AvailableBus.find().select({ From: 1, To: 1 });
        if (allavailablelocation) {
            res.status(200).send({
                success: true,
                message: "location found successfully",
                data: allavailablelocation
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "location not found",
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "server error occured",
        })
        console.log(error);
    }
});

//query search data
router.get('/search-data', async (req, res) => {
    try {
        const date = req.query.date;
        const from = req.query.from;
        const to = req.query.to;
        const coachType = req.query.coachType;
        const allavailablesearchBus = await AvailableBus.find({$and: [{Date: new Date(date)},{From:from},{To:to},{CoachType:coachType}]});

        if (allavailablesearchBus) {
            res.status(200).send({
                success: true,
                message: "bus found successfully",
                data: allavailablesearchBus
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "bus not found",
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "server error occured",
        })
        console.log(error);
    }
});

router.post("/", async (req, res) => {
    try {
      const busProvider = req.body;
  
      const newBusProvider = new AvailableBus(busProvider);
      await newBusProvider.save((err) => {
        if (!err) {
          res.status(201).send({ message: "new Bus created successfully" });
        } else {
          res.status(500).send({ message: "not created" });
        }
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });



module.exports = router;