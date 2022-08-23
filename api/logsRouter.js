import express from 'express'
import serverData from '../server.js'
const router = express.Router({mergeParams: true});

router.route('/').get((req, res, next)=>{
  const _id = req.params._id
  const obj = serverData.find((obj)=>obj._id === String(_id))
  const output = {...obj}

  const from = new Date(req.query.from)
  const to = new Date(req.query.to)
  const limit = req.query.limit
  
  //don't just make =, objects and arrays must be copied
  let log = output.log.map((exer)=>({...exer}))
  if (from && !isNaN(from)){
    log = log.filter((exer)=> exer.date >= from)
  }
  if (to && !isNaN(to)){
    log = log.filter((exer)=> exer.date <= to)
  }
  if (limit){
    log = log.slice(0, limit)
  }
  console.log(log)
  for (let exer of log){
    exer.date = exer.date.toDateString()
  }
  output.log = log
  res.send(output)
})


export default router