const db  = require('../models/index');


const authController = {
  verifyUser (req, res, next) {
    console.log('in verify user')
    const pass = res.locals.users[0].password
    const inputpass = res.locals.params[1]
    console.log('input', inputusername)
    console.log('db', username) 
    console.log('howdy jarry', req.params)
    // if (err) res.locals.error = err; 
    if (pass === inputpass) {
     console.log('bruh')
      next()
    }
    else {
      next(err)
    }
  }
 }

 module.exports = authController