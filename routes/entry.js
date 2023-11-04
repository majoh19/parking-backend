const {Router} = require('express')
const {createEntry, listEntry, editEntry, deleteEntry} = require('../controllers/entry')
const router = Router()

router.post('/', createEntry)
router.get('/', listEntry)
router.put('/:entryId', editEntry)
router.delete('/:entryId', deleteEntry)

module.exports = router