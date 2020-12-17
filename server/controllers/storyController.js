const db  = require('../models/index');

const storyController = {
  //Get for all stories
  getAllStories (req, res, next) {
    const queryString = 'SELECT * FROM Cards;'
    db.query(queryString)
      .then((data) => {
        res.locals.stories = data.rows;
        console.log(data);
        return next();
      })
      .catch((err) => {
        console.log('error in getAllStories ', err)
        return next(err);
      })
  },
  //post request
  postStory (req, res, next) {
    const params = [req.body.UserId, req.body.Post, req.body.Help, req.body.Payment, req.body.Longitude, req.body.Latitude];
    console.log(params, " PARAMS")
    const queryString = `INSERT INTO Cards (CardId, FirstName, LastName, Post, Help, Payment, Longitude, Latitude) 
                         VALUES ((SELECT Id from Users WHERE Id = $1), (SELECT firstname from Users WHERE Id = $1), (SELECT lastname from Users WHERE Id = $1), 
                         $2, $3, $4, $5, $6) RETURNING *;`;
    db.query(queryString, params)
      .then((data) => {
        return next()
      })
      .catch((err) => {
        console.log('error in postStory: ', err)
        return next(err)
      })
  },
  
  getStory (req, res, next) {
    const queryString = `SELECT * FROM Cards WHERE cardid = $1;`
    const params = [req.params.id]
    db.query(queryString, params)
      .then((data) => {
        res.locals.story = data.rows;
        return next();
      })
      .catch((err) => {
        console.log('error in getStory ', err)
        return next(err)
      })
  },
  
  deleteStory (req, res, next) {
    const id = req.params.id
    const queryString = `DELETE FROM Cards WHERE cardid = ${id};`
    db.query(queryString)
      .then((data) => {
        // res.status(200).send('card deleted');
        console.log('inside query')
        return next();
      })
      .catch((err) => {
        console.log('error in deleteStory: ', err)
        return next(err)
      })
  }
};


module.exports = storyController;