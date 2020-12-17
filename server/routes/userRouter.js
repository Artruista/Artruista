const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController.js')
//import auth
const authController = require('../controllers/authController.js')

router.post('/', Controller.postUser, (req, res) => {
  return res.status(200).send()
})

router.get('/:Username', Controller.getUser, authController.verifyUser , (req, res) => {
  return res.status(200).json(res.locals.users)
})

module.exports = router 