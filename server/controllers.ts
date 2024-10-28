import { type Request, type Response } from "express";
import { PrismaClient } from '@prisma/client'
import type { events } from '@prisma/client'
const prisma = new PrismaClient()

type postBody = {
    title: string, description?: string, date: Date, startTime: string,
    endTime: string
}


const getDailyDateRange = (year: number, month: number, day: number) => {
    const startDate = new Date(year, month - 1, day);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);
    return { startDate, endDate };
};


const getWeeklyDateRange = (year: number, month: number, week: number) => {
    const startOfMonth = new Date(year, month - 1, 1);
    const startDate = new Date(startOfMonth.setDate((week - 1) * 7 + 1));
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);
    return { startDate, endDate };
};


const getMonthlyDateRange = (year: number, month: number) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    return { startDate, endDate };
};



export const getEvents = async (req: Request, res: Response) => {
    try {
        const userId = req.headers?.["x-user-id"]
        const view=req.headers?.["x-view"]
        const { year, month, day, week } = req.query
        
        let data:events[]=[]
        if (!year || !month || !day || !week) res.status(400).json({ error: "Year, month, day,and week are required" });

        if (view=="month") {
            const { startDate, endDate } = getMonthlyDateRange(parseInt(year as string), parseInt(month as string));

            data = await prisma.events.findMany({
                where: {
                    userId: userId as string,
                    date: {
                        gte: startDate,
                        lt: endDate
                    }
                }
            })
            
        } else if (view==="week") {
            const { startDate, endDate } = getWeeklyDateRange(parseInt(year as string), parseInt(month as string), parseInt(week as string));
             data= await prisma.events.findMany({
                where: {
                    userId: userId as string,
                    date: {
                        gte: startDate,
                        lt: endDate
                    }
                }
            })
            
        }else if(view==="day"){
            const { startDate, endDate } = getDailyDateRange(parseInt(year as string), parseInt(month as string), parseInt(day as string));
            data= await prisma.events.findMany({
                where: {
                    userId: userId as string,
                    date: {
                        gte: startDate,
                        lt: endDate
                    }
                }
            })
            
        }else {
            return res.status(400).json({ error: "Invalid date range parameters." });
          }
          

          res.status(200).json({ data });
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

