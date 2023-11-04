const Entry = require('../models/entry')
const {request, response} = require('express')
const {validationResult, check} = require('express-validator')

//Create
const createEntry = async (req = request, res = response) => {
    try {
        
        await Promise.all([
            check('plateNumber', 'invalid.plateNumber').not().isEmpty().run(req),
            check('brand', 'invalid.brand').not().isEmpty().run(req),
            check('model', 'invalid.model').not().isEmpty().run(req),
            check('exitDate', 'invalid.exitDate').not().isEmpty().run(req)
        ])

        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({message: errors.array()})
        }

        const existEntry = Entry.findOne({plateNumber: req.body.plateNumber})
        if (existEntry) {
            return res.status(400).send('The vehicle already exists')
        }

        let entry = new Entry()
        entry.plateNumber = req.body.plateNumber
        entry.brand = req.body.brand
        entry.model = req.body.model
        entry.entryDate = new Date()
        entry.exitDate = req.body.exitDate

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
        if (req.body.exitDate) entry.exitDate = req.body.exitDate
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