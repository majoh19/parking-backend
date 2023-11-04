const {Router} = require('express')
const {createUser, listUser, editUser, deleteUser} = require('../controllers/user')
const router = Router()

router.post('/', createUser)
router.get('/', listUser)
router.put('/:userId', editUser)
router.delete('/:userId', deleteUser)

module.exports = router