const router = require('express').Router()
const Account = require('./accounts-model')
const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const accounts = await Account.getAll()
    res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.get(
  '/:id', 
  checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json(req.account)
  }catch(err){
    next(err)
  }
})

router.post(
  '/', 
  checkAccountPayload, 
  checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  }catch(err){
    next(err)
  }
})

router.put(
  '/:id', 
  checkAccountId, 
  checkAccountNameUnique, 
  checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json('update accounts by id')
  }catch(err){
    next(err)
  }
});

router.delete(
  '/:id', 
  checkAccountId,(req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json('delete accounts by id')
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
