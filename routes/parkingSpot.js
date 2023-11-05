const {Router} = require('express')
const {createParkingSpot, listParkingSpot, editParkingSpot, deleteParkingSpot} = require('../controllers/parkingSpot')
const router = Router()

router.post('/', createParkingSpot)
router.get('/', listParkingSpot)
router.put('/:parkingSpotId', editParkingSpot)
router.delete('/:parkingSpotId', deleteParkingSpot)

module.exports = router