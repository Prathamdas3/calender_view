import express,{type Request,type Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createEvent, deleteEvent, getEvent,getEvents, updateEvent } from './controllers'

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())

app.get('/',(_req:Request,res:Response)=>{
    res.json({"message":"wellcome"})
})

app.get('/events', async (req: Request, res: Response) => {
    await getEvents(req, res);
});

app.get('/event/:id', async (req: Request, res: Response) => {
    await getEvent(req, res);
});

app.post('/event', async (req: Request, res: Response) => {
    await createEvent(req, res);
});

app.patch('/event/:id', async (req: Request, res: Response) => {
    await updateEvent(req, res);
});

app.delete('/event/:id', async (req: Request, res: Response) => {
    await deleteEvent(req, res);
});


app.listen(PORT, () => console.log('http://localhost:' + PORT))