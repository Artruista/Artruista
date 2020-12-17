const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController.js')

router.post('/', Controller.postUser, (req, res) => {
  return res.status(200).send()
})

router.get('/:id', Controller.getUser, (req, res) => {
  return res.status(200).json(res.locals.users)
})

module.exports = router 