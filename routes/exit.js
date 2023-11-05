const {Router} = require('express')
const {createExit, listExit, editExit, deleteExit} = require('../controllers/exit')
const router = Router()

router.post('/', createExit)
router.get('/', listExit)
router.put('/:exitId', editExit)
router.delete('/:exitId', deleteExit)

module.exports = router