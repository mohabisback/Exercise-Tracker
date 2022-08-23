import express from 'express'
import serverData from '../server.js'
const router = express.Router({mergeParams: true});


router.route('/').post((req, res, next)=>{
  const _id = req.params._id
  const description = req.body.description
  const duration = req.body.duration
  let date = new Date(req.body.date)
  if (!date || isNaN(date)) {date = new Date()}
  const obj = serverData.find((obj)=>obj._id===String(_id))
  console.log(obj)
  obj.log = obj.log.concat([{description, duration: Number(duration), date }])
  obj.count = obj.log.length
  const username = obj.username
  res.send({username, _id, description, duration, date: date.toDateString()})
  
})

export default router