const Payment = require('../models/payment')
const ParkingSpot = require('../models/parkingSpot')
const {request, response} = require('express')
const {validationResult, check} = require('express-validator')

//Create
const createPayment = async (req = request, res = response) => {
    try {
        
        await Promise.all([
            check('amount', 'invalid.amount').not().isEmpty().run(req),
            check('parkingSpot', 'invalid.parkingSpot').not().isEmpty().run(req),
        ])

        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({message: errors.array()})
        }

        const parkingSpot = await ParkingSpot.finOne({_id: req.body.parkingSpot})
        if (!parkingSpot) {
            return res.status(400).send('Invalid spot')
        } 

        let payment = new Payment()
        payment.amount = req.body.amount
        payment.paymentDate = new Date()
        payment.parkingSpot = req.body.parkingSpot

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
        const payments = await Payment.find()
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
        if (req.body.amount) payment.amount = req.body.amount
        if (req.body.parkingSpot) payment.parkingSpot = req.body.parkingSpot
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