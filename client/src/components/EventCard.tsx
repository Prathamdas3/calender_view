import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Clock, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useDeleteEvent, useUpdateEvent } from '@/hooks'
import { toast } from 'sonner'
import { Event } from './Events'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  date: z.string({
    required_error: "A date is required.",
  }),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Start time must be in HH:MM format.",
  }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "End time must be in HH:MM format.",
  }),
  description: z.string().optional(),
})

type EventData = z.infer<typeof formSchema>


export default function EventCard({ data, userId }: { data: Event, userId: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [eventData, setEventData] = useState<EventData>({
    title: data.title,
    date: new Date(data.date).toISOString().split('T')[0],
    startTime: data.start_time,
    endTime: data.end_time,
    description: data.description,
  })
  const { mutate } = useDeleteEvent()
  const { mutate: update } = useUpdateEvent()


  const form = useForm<EventData>({
    resolver: zodResolver(formSchema),
    defaultValues: eventData,
  })

  function onSubmit(values: EventData) {
    const { startTime, endTime, title, description, date } = values
    update({ id: data.id, userId, startTime, endTime, date: new Date(date), title, description })
    toast('Successfully changed the event')
    setEventData(values)
    setIsDialogOpen(false)
    form.reset()
  }

  function handleDelete() {
    mutate({ id: data.id, userId: userId })
    toast.success("Event deleted successfully")
  }

  return (
    <>
      <Card className="w-full my-1">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row justify-between items-center">
            <span>{eventData.title.slice(0, 1).toUpperCase() + eventData.title.slice(1, eventData.title.length).toLowerCase()}</span>
            <div>
              <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(true)}>
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit event</span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete event</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      event and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className='bg-red-500 dark:text-white dark:bg-red-700' >Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>{format(eventData.date, 'MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
            <Clock className="h-4 w-4" />
            <span>{eventData.startTime} - {eventData.endTime}</span>
          </div>
          {eventData.description && (
            <p className="mt-4 text-sm ">{eventData.description}</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Make changes to your event here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Date</FormLabel>
                    <FormControl >
                      <Input placeholder="date" type='date'  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input {...field} type="time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input {...field} type="time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}