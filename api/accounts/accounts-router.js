const router = require('express').Router()
const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json('get accounts')
  }catch(err){
    next(err)
  }
})

router.get(
  '/:id', 
  checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json('get accounts by id')
  }catch(err){
    next(err)
  }
})

router.post(
  '/', 
  checkAccountPayload, 
  checkAccountNameUnique,(req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json('post accounts')
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
