const Entry = require('../models/entry')
const User = require('../models/user')
const {request, response} = require('express')
const {validationResult, check} = require('express-validator')

//Create
const createEntry = async (req = request, res = response) => {
    try {       
        await Promise.all([
            check('entryDate', 'invalid.entryDate').matches(/^\d{2}\/\d{2}\/\d{4}$/).run(req),
            check('entryHour', 'invalid.entryHour').matches(/^\d{2}:\d{2}$/).run(req),
            check('plateNumber', 'invalid.plateNumber').not().isEmpty().run(req),
            check('brand', 'invalid.brand').not().isEmpty().run(req),
            check('model', 'invalid.model').not().isEmpty().run(req),
            check('owner', 'invalid.owner').not().isEmpty().run(req)
        ])
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({message: errors.array()})
        }
        const owner = await User.findOne({ _id: req.body.owner })
        if (!owner) {
            return res.status(400).send('Invalid user')
        }
        let entry = new Entry()
        entry.entryDate = new Date().toLocaleDateString('eng-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        })
        entry.entryHour = new Date().toLocaleTimeString('eng-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
        entry.plateNumber = req.body.plateNumber
        entry.brand = req.body.brand
        entry.model = req.body.model
        entry.owner = req.body.owner
        entry = await entry.save()
        res.send(entry)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while creating the entry')
    }
}

//List
const listEntry = async (req = request, res = response) => {
    try {
        const entries = await Entry.find()
        res.send(entries)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while listing the entries')
    }
}

//Edit
const editEntry = async (req = request, res = response) => {
    try {
        const entryId = req.params.entryId
        const entry = await Entry.findById(entryId)
        if (!entry) {
            return res.status(404).send('Entry not found')
        }
        if (req.body.plateNumber) entry.plateNumber = req.body.plateNumber
        if (req.body.brand) entry.brand = req.body.brand
        if (req.body.model) entry.model = req.body.model
        const updatedEntry = await entry.save()
        res.send(updatedEntry)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while editing the entry')
    }
}

//Delete
const deleteEntry = async (req = request, res = response) => {
    try {
        const entryId = req.params.entryId
        const entry = await Entry.findById(entryId)
        if (!entry) {
            return res.status(404).send('Entry not found')
        }
        await Entry.findByIdAndDelete(entryId)
        res.send('Entry deleted successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while deleting the entry')
    }
}

module.exports = {createEntry, listEntry, editEntry, deleteEntry}