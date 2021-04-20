const express =require('express')
const sensorsController = require('../controllers/sensorsController')
const router = express.Router()

router.route('/sensor')
    .post(sensorsController.insert)

module.exports =router
