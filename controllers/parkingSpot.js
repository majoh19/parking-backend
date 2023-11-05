const ParkingSpot = require('../models/parkingSpot')
const Entry = require('../models/entry')
const Exit = require('../models/exit')
const {request, response} = require('express')
const {validationResult, check} = require('express-validator')

//Create
const createParkingSpot = async (req = request, res = response) => {
    try {      
        await Promise.all([
            check('spotNumber', 'invalid.spotNumber').not().isEmpty().run(req),
            check('isOccupied', 'invalid.isOccupied').optional().isBoolean().run(req),
            check('entry', 'invalid.entry').not().isEmpty().run(req),
            check('exit', 'invalid.exit').not().isEmpty().run(req),
        ])
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({message: errors.array()})
        }
        const entry = await Entry.findOne({_id: req.body.entry})
        if (!entry) {
            return res.status(400).send('Invalid entry')
        }
        const exit = await Exit.findOne({_id: req.body.exit})
        if (!exit) {
            return res.status(400).send('Invalid exit')
        }
        let parkingSpot = new ParkingSpot()
        parkingSpot.spotNumber = req.body.spotNumber
        parkingSpot.isOccupied = req.body.isOccupied
        parkingSpot.entry = req.body.entry
        parkingSpot.exit = req.body.exit
        parkingSpot = await parkingSpot.save()
        res.send(parkingSpot)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while creating the parking spot')
    }
}

//List
const listParkingSpot = async (req = request, res = response) => {
    try {
        const parkingSpots = await ParkingSpot.find().populate('entry').populate('exit')
        res.send(parkingSpots)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while listing the parking spots')
    }
}

//Edit
const editParkingSpot = async (req = request, res = response) => {
    try {
        const parkingSpotId = req.params.parkingSpotId
        const parkingSpot = await ParkingSpot.findById(parkingSpotId)
        if (!parkingSpot) {
            return res.status(404).send('Parking spot not found')
        }
        if (req.body.spotNumber) parkingSpot.spotNumber = req.body.spotNumber
        if (req.body.isOccupied) parkingSpot.isOccupied = req.body.isOccupied
        if (req.body.entry) parkingSpot.entry = req.body.entry
        if (req.body.exit) parkingSpot.exit = req.body.exit
        const updatedParkingSpot = await parkingSpot.save()
        res.send(updatedParkingSpot)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while editing the parking spot')
    }
}

//Delete
const deleteParkingSpot = async (req = request, res = response) => {
    try {
        const parkingSpotId = req.params.parkingSpotId
        const parkingSpot = await ParkingSpot.findById(parkingSpotId)
        if (!parkingSpot) {
            return res.status(404).send('Parking spot not found')
        }
        await ParkingSpot.findByIdAndDelete(parkingSpotId)
        res.send('Parking spot deleted successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while deleting the parking spot')
    }
}

module.exports = {createParkingSpot, listParkingSpot, editParkingSpot, deleteParkingSpot}