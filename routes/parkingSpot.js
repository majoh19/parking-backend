const {Router} = require('express')
const {createParkingSpot, listParkingSpot, editParkingSpot, deleteParkingSpot} = require('../controllers/parkingSpot')
const router = Router()

router.post('/', createParkingSpot)
router.get('/', listParkingSpot)
router.put('/:spotId', editParkingSpot)
router.delete('/:spotId', deleteParkingSpot)

module.exports = router