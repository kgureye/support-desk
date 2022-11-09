const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)


const app = express()

router.post('/', (req,res) => {
    res.send('Register Route')
})

module.exports = router /* How we export using the JS syntax */
