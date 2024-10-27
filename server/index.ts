import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createEvent, deleteEvent, getEvent,getEvents, updateEvent } from './controllers'

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())


app.get('/api/events',getEvents)

app.get('/api/event/:id',getEvent)

app.post('/api/event',createEvent)

app.patch('/api/event/:id',updateEvent)

app.delete('/api/event/:id',deleteEvent)


app.listen(PORT, () => console.log('http://localhost:' + PORT))