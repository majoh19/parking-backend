const ParkingSpot = require('../models/parkingSpot')
const User = require('../models/user')
const {request, response} = require('express')
const {validationResult, check} = require('express-validator')

//Create
const createParkingSpot = async (req = request, res = response) => {
    try {
        
        await Promise.all([
            check('spotNumber', 'invalid.spotNumber').not().isEmpty().run(req),
            check('isOccupied', 'invalid.isOccupied').not().isEmpty().run(req),
            check('user', 'invalid.user').not().isEmpty().run(req),
        ])

        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({message: errors.array()})
        }

        const existParkingSpot = ParkingSpot.findOne({spotNumber: req.body.spotNumber})
        if (existParkingSpot) {
            return res.status(400).send('The spot already exists')
        }

        const user = await User.finOne({_id: req.body.user})
        if (!user) {
            return res.status(400).send('Invalid user')
        } 

        let parkingSpot = new ParkingSpot()
        parkingSpot.spotNumber = req.body.spotNumber
        parkingSpot.isOccupied = req.body.isOccupied
        parkingSpot.user = req.body.user

        parkingSpot = await parkingSpot.save()

        res.send(parkingSpot)

    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while creating the spot')
    }
}

//List
const listParkingSpot = async (req = request, res = response) => {
    try {
        const spots = await ParkingSpot.find()
        res.send(spots)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while listing the spots')
    }
}

//Edit
const editParkingSpot = async (req = request, res = response) => {
    try {
        const spotId = req.params.spotId
        const spot = await ParkingSpot.findById(spotId)
        if (!spot) {
            return res.status(404).send('Spot not found')
        }
        if (req.body.spotNumber) spot.spotNumber = req.body.spotNumber
        if (req.body.isOccupied) spot.isOccupied = req.body.isOccupied
        if (req.body.user) spot.user = req.body.user
        const updatedSpot = await spot.save()
        res.send(updatedSpot)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while editing the spot')
    }
}

//Delete
const deleteParkingSpot = async (req = request, res = response) => {
    try {
        const spotId = req.params.spotId
        const spot = await ParkingSpot.findById(spotId)
        if (!spot) {
            return res.status(404).send('Spot not found')
        }
        await ParkingSpot.findByIdAndDelete(spotId)
        res.send('Spot deleted successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while deleting the spot')
    }
}

module.exports = {createParkingSpot, listParkingSpot, editParkingSpot, deleteParkingSpot}