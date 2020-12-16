const db  = require('../models/index');

const storyController = {
  //post request
  postStory (req, res, next) {
    const params = req.body;
    const queryString = `INSERT INTO Cards (Story, CovidPost, HowToHelp, PaymentAccount, ImagePath) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
    const cb = (err, result) => {
      if (err) {
        console.log(`error in postStory: `)
        return next(err)
      }
      else return next()
    }   
    db.query(queryString, params, cb)
  },
  getStory (req, res, next) {
    const queryString = `SELECT * FROM Listings WHERE Id = $1;`
    const params = req.params.id
    const cb = (err, result) => {
      if (err) {
        console.log(`error in getStory`)
        return next(err)
      }
      else 
      {
        res.locals.story = result.rows[0];
        return next()
      }
    }
    db.query(queryString, params , cb)
  },
  
  deleteStory (req, res, next) {
    const queryString = `DELETE FROM Listings WHERE Id = $1 RETURNING *;`
    const params = req.params.id
    const cb = (err, result) => {
      if (err) {
        console.log(`error in deleteStory`)
        return next(err)
      }
      else return next()
    }
    db.query(queryString, params , cb)
  }
};

module.exports = storyController;