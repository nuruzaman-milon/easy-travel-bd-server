const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const partnersSchema = require('../schemas/partnersSchema');

const Partners = new mongoose.model('Partners', partnersSchema);

router.get('/', async(req,res)=>{
    try {
        const allPartners = await Partners.find();
        if (allPartners) {
            res.status(200).send({
                success: true,
                message: "partners found successfully",
                data:allPartners
            })
        }
        else{
            res.status(404).send({
                success: false,
                message: "partners not found",
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "server error occured",
        })
        console.log(error);
    }
})

module.exports = router;