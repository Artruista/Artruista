const db  = require('../models/index');

const storyController = {
  //post request
  postStory (req, res, next) {
    const params = [req.body.UserId, req.body.Story, req.body.CovidPost, req.body.HowToHelp, req.body.PaymentAccount, req.body.ImagePath];
    const queryString = `INSERT INTO Cards (CardId, Story, CovidPost, HowToHelp, PaymentAccount, ImagePath, CreatedAt) VALUES ((SELECT Id from Users WHERE Id = $1), $2, $3, $4, $5, $6, now()) RETURNING *;`
    // const cb = (err, result) => {
    //   if (err) {
    //     console.log(`error in postStory: `)
    //     return next(err)
    //   }
    //   else return next()
    // }   
    // console.log(req.body, " req.body")
    // console.log(params, " PARAMS")
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
    const queryString = `SELECT * FROM Cards WHERE CardId = $1;`
    const params = req.params.id
    // const cb = (err, result) => {
    //   if (err) {
    //     console.log(`error in getStory`)
    //     return next(err)
    //   }
    //   else 
    //   {
    //     res.locals.story = result.rows[0];
    //     return next()
    //   }
    // }
    db.query(queryString, params)
      .then((data) => {
        res.local.story = result.rows[0];
        return next();
      })
      .catch((err) => {
        console.log('error in getStory ', err)
        return next(err)
      })
  },
  
  deleteStory (req, res, next) {
    const queryString = `DELETE FROM Cards WHERE CardId = $1 RETURNING *;`
    const params = req.params.id
    console.log(req.params.id, ' req.params')
    console.log(params, ' PARAMS')
    // const cb = (err, result) => {
    //   if (err) {
    //     console.log(`error in deleteStory`)
    //     return next(err)
    //   }
    //   else return next()
    // }
    db.query(queryString, params)
      .then((data) => {
        res.status(200).send('card deleted');
        return next();
      })
      .catch((err) => {
        console.log('error in deleteStory: ', err)
        return next(err)
      })
  }
};


module.exports = storyController;