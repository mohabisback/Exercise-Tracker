import express from 'express'
import serverData from '../server.js'
const router = express.Router();
router.route('/').get(async (req, res, next)=>{
  res.send(serverData.map((obj)=>({_id: obj._id, username: obj.username })))
})
router.route('/').post(async (req, res, next)=>{
  try {
    console.log('im post')
    const username = req.body.username
    if(username){
      const obj = serverData.find((obj)=>obj.username === username) 
      if (obj){
        res.send({ username: obj.username, _id: obj._id })
      } else {
        const _id = String(serverData.length + 1)
        serverData.push({_id, username, log: [], count: 0})
        res.send({_id, username})
      }
    } else {
      res.send({error: 'no username'})
    }
  } catch (error) {
    res.send({error: 'no username'})
  }
})


export default router