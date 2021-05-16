const express =require('express')
const userController = require('../controllers/usersController')
const router = express.Router()

router.route('/users')
    .post(userController.create)
router.post('/login',userController.login)

router.post('/observers',userController.addObserver)

router.get('/data',userController.getpatient)
router.get('/csv/:email',userController.generateCSV)
module.exports =router
