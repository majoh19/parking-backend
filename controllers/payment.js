const Payment = require('../models/payment')
const Entry = require('../models/entry')
const Exit = require('../models/exit')
const {request, response} = require('express')
const {validationResult, check} = require('express-validator')

//Create
const createPayment = async (req = request, res = response) => {
    try {        
        await Promise.all([
            check('entry', 'invalid.entry').not().isEmpty().run(req),
            check('exit', 'invalid.exit').not().isEmpty().run(req),
            check('totalAmount', 'invalid.totalAmount').not().isEmpty().run(req)
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
        let payment = new Payment()
        payment.entry = req.body.entry
        payment.exit = req.body.exit
        payment.totalAmount = req.body.totalAmount
        payment = await payment.save()
        res.send(payment)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while creating the payment')
    }
}

//List
const listPayment = async (req = request, res = response) => {
    try {
        const payments = await Payment.find().populate('entry').populate('exit')
        res.send(payments)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while listing the payments')
    }
}

//Edit
const editPayment = async (req = request, res = response) => {
    try {
        const paymentId = req.params.paymentId
        const payment = await Payment.findById(paymentId)
        if (!payment) {
            return res.status(404).send('Payment not found')
        }
        if (req.body.entry) payment.entry = req.body.entry
        if (req.body.exit) payment.exit = req.body.exit
        if (req.body.totalAmount) payment.totalAmount = req.body.totalAmount
        const updatedPayment = await payment.save()
        res.send(updatedPayment)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while editing the payment')
    }
}

//Delete
const deletePayment = async (req = request, res = response) => {
    try {
        const paymentId = req.params.paymentId
        const payment = await Payment.findById(paymentId)
        if (!payment) {
            return res.status(404).send('Payment not found')
        }
        await Payment.findByIdAndDelete(paymentId)
        res.send('Payment deleted successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while deleting the payment')
    }
}

module.exports = {createPayment, listPayment, editPayment, deletePayment}