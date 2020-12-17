const db  = require('../models/index');


const authController = {
  verifyUser(req, res, next) {
    const username = res.locals.users.Username
    const inputUsername = res.params.Username
    // const password = res.locals.users.Password
    console.log(username) 
    console.log(inputUsername)
    // if (username = )
    next()
  }
 }

 module.exports = authController