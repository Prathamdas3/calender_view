import express, {type Response,type Request} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app= express()
const PORT=process.env.PORT||8000

app.use(cors())
app.use(bodyParser.json())


app.get('/api/events',(_:Request,res:Response)=>{
    res.send("Hello")
})

app.listen(PORT,()=>console.log('http://localhost:'+PORT))