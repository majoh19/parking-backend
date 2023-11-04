const {Router} = require('express')
const {createPayment, listPayment, editPayment, deletePayment} = require('../controllers/payment')
const router = Router()

router.post('/', createPayment)
router.get('/', listPayment)
router.put('/:paymentId', editPayment)
router.delete('/:paymentId', deletePayment)

module.exports = router