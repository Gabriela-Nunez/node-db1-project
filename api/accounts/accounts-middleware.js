const Account = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  if(req.body.name === undefined || req.body.budget === undefined) {
    next({ status: 400, message: "name and budget are required"})
  } else 
  if(req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100" })
  } else 
  if(isNaN(req.body.budget) || typeof req.body.budget !== 'number') {
    next({ status: 400, message: "budget of account must be a number"})
  } else 
  if(req.body.budget < 0 || req.body.budget > 1000000) {
    next({ status: 400, message: "budget of account is too large or too small"})
  } else {
    next()
  }  
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const existingName = await db('accounts')
    .where('name', req.body.name.trim())
    .first()
    if(existingName) {
      next({ status: 400, message: "that name is taken"})
    } else {
      next()
    }
  }catch(err){
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const account = await Account.getById(req.params.id)
    if(!account) {
      next({ status: 404, message: 'unable to find account with that id'})
    } else {
      req.account = account
      next()
    }
  }catch(err){
    next(err)
  }
}
