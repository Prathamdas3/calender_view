import { type Request, type Response } from "express";
import { PrismaClient } from '@prisma/client'
import type { events } from '@prisma/client'

type updateBody = {
    title: string, userId: string, id: string, description?: string, date: Date
}

type postBody = {
    title: string, userId: string, description?: string, date: Date,

}

const prisma = new PrismaClient()

export const getEvents = async (_: Request, res: Response) => {
    try {
        const data: events[] = await prisma.events.findMany()
        console.log(data)
        res.json({ data }).status(200)
    } catch (error) {
        console.log(error)
        res.json({ message: 'error fetching events' }).status(500)
    }
}

export const getEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (id) {
            res.status(400).json({ message: 'ID parameter required' })
        }

        const data: events | null = await prisma.events.findUnique({
            where: {
                id: id
            }
        })

        if (!data) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
        res.status(200).json({ data })

    } catch (error) {
        console.log(error)
        res.json({ message: 'error in fetching event' }).status(500)
    }
}

export const createEvent = async (req: Request, res: Response) => {
    try {
        const { title, description, date, userId } = req.body as postBody
        if (!title || !description || !date || !userId) {
            res.status(400).json({ message: "body is missing" })
        }
        const data = await prisma.events.create({
            data: {
                title: title,
                description: description,
                date: date,
                userId: userId
            }
        })
        res.status(201).json({
            message: 'event created successfully',
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error creating new event" })
    }
}

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { title, description, date, userId } = req.body as updateBody
        if (!id) {
            res.status(400).json({ message: 'Id is required' })
        }
        const data = await prisma.events.update({
            where: {
                id: id,
                userId: userId
            },
            data: {
                title: title,
                description: description,
                date: date
            }
        })

        res.status(200).json({ message: 'event update successfull', data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'error while updating the message' })
    }
}

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        if (!id) {
            res.status(400).json({ message: 'Event Id required' })
            return
        }
        if (!userId) {
            res.status(400).json({ message: 'User Id requeired' })
            return
        }
        const data = await prisma.events.delete({
            where: {
                id: id,
                userId: userId
            }
        })

        res.status(200).json({
            message: "Successfully deleted the Event",
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error while deleting the event' })
    }
}

// export const getEventsAccordingToDate=async(req:Request,res:Response)=>{
//     try {
//         const {date}=req.params
//        const data=await prisma.events.findMany({
//         where:{
//             date:date
//         }
//        }) 
//        res.status(200).json({data})
//     } catch (error) {
//         console.log('error while getting events according to events',error)
//     }
// }