const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController.js')

router.post('/', Controller.postUser, (req, res) => {
  return res.status(200).send()
})

module.exports = router 