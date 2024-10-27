import { type Request, type Response } from "express";
import { PrismaClient } from '@prisma/client'
import type { events } from '@prisma/client'



type postBody = {
    title: string, description?: string, date: Date, startTime: string,
    endTime: string

}

const prisma = new PrismaClient()

export const getEvents = async (req: Request, res: Response) => {
    try {
        const userId = req.headers?.["x-user-id"]
        const data: events[] = await prisma.events.findMany({
            where: {
                userId: userId as string
            }
        })
        res.json({ data }).status(200)
    } catch (error) {
        console.log(error)
        res.json({ message: 'error fetching events' }).status(500)
    }
}

export const getEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const userId = req.headers?.["x-user-id"]

        if (!id) {
            res.status(400).json({ message: 'ID parameter required' })
        }
        if (!userId) res.status(400).json({ message: 'UserId parameter required' })


        const data: events | null = await prisma.events.findUnique({
            where: {
                id: id,
                userId: userId as string
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
        const userId = req.headers?.["x-user-id"]
        const { title, description, date, startTime, endTime } = req.body as postBody


        if (!userId) res.status(400).json({ message: "userId is required" })

        if (!title || !description || !date) res.status(400).json({ message: "body is missing" })

        const data = await prisma.events.create({
            data: {
                title: title,
                description: description,
                date: date,
                start_time: startTime,
                end_time: endTime,
                userId: userId as string
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
        const userId = req.headers?.["x-user-id"]
        const { title, description, date, startTime, endTime } = req.body as postBody & { id: string }
        if (!id) {
            res.status(400).json({ message: 'Id is required' })
        }
        const data = await prisma.events.update({
            where: {
                id: id,
                userId: userId as string
            },
            data: {
                title: title,
                description: description,
                date: date,
                start_time: startTime,
                end_time: endTime
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
        const userId = req.headers?.["x-user-id"]
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
                userId: userId as string
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

