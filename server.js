import express from 'express'
import cors from 'cors'
import logsRouter from './api/logsRouter.js'
import exercisesRouter from './api/exercisesRouter.js'
import usersRouter from './api/usersRouter.js'

const serverData = [{
  username: "fcc_test",
  count: 1,
  _id: "1",
  log: [
    {
    description: "test",
    duration: 60,
    date: new Date("Mon Jan 01 2000"),
    },
    {
    description: "test",
    duration: 60,
    date: new Date("Mon Jan 01 1990"),
    },
    {
    description: "test",
    duration: 60,
    date: new Date("Mon Jan 01 2010"),
    },
    {
    description: "test",
    duration: 60,
    date: new Date("Mon Jan 01 2020"),
    }
  ] 
}]

const app = express();
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('./public'))

app.use('/api/users/:_id/logs', logsRouter)
app.use('/api/users/:_id/exercises', exercisesRouter )
app.use('/api/users', usersRouter)


app.listen(5000, ()=>{console.log('Server Listening, Port 5000')})

app.get('/',(req, res)=>{
  res.status(200).sendFile('index.html')
})
app.all('*', (req, res)=>{
  res.status(404).send({error: 'page not found'});
})

export default serverData