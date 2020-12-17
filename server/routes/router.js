const express = require('express')
const router = express.Router()
const Controller = require('../controllers/storyController.js')

router.get('/:id', Controller.getStory , (req, res) => {
  return res.status(200).json(res.locals.story)
})

router.get('/', Controller.getAllStories, (req, res) => {
  return res.status(200).json(res.locals.stories)
})

router.post('/', Controller.postStory, (req, res) => {
  return res.status(200).send()
})

router.delete('/:id', Controller.deleteStory, (req, res) => {
  return res.status(200).send('In deleteStory router')
})

module.exports = router