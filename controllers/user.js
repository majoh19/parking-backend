const User = require('../models/user')
const Entry = require('../models/entry')
const {request, response} = require('express')
const {validationResult, check} = require('express-validator')

//Create
const createUser = async (req = request, res = response) => {
    try {
        
        await Promise.all([
            check('name', 'invalid.name').not().isEmpty().run(req),
            check('entries', 'invalid.entries').not().isEmpty().run(req)
        ])

        const errors = validationResult(req)
        if (!errors) {
            return res.status(400).json({message: errors.array()})
        }

        const existUser = User.findOne({name: req.body.name})
        if (existUser) {
            return res.status(400).send('The user already exists')
        }

        const entry = await Entry.finOne({_id: req.body.entries})
        if (!entry) {
            return res.status(400).send('Invalid entry')
        }

        let user = new User()
        user.name = req.body.name
        user.entries = req.body.entries

        user = await user.save()

        res.send(user)

    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while creating the user')
    }
}

//List
const listUser = async (req = request, res = response) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while listing the users')
    }
}

//Edit
const editUser = async (req = request, res = response) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).send('User not found')
        }
        if (req.body.name) user.name = req.body.name
        if (req.body.entries) user.entries = req.body.entries
        const updatedUser = await user.save()
        res.send(updatedUser)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while editing the user')
    }
}

//Delete
const deleteUser = async (req = request, res = response) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).send('User not found')
        }
        await User.findByIdAndDelete(userId)
        res.send('User deleted successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while deleting the user')
    }
}

module.exports = {createUser, listUser, editUser, deleteUser}