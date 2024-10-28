import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { ModeToggle } from "./ModeToggler";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useCreateEvent } from "@/hooks";
import {toast} from 'sonner'
import { useState } from "react";

const EventForm = z.object({
  title: z.string().min(8, 'minimum length of the should be 8'),
  description: z.string().min(20, 'minimum length should be 20').optional(),
  date: z.string().min(10, 'date must be in YYYY-MM-DD format'),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Start time must be in HH:MM format.",
  }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "End time must be in HH:MM format.",
  }),
})

type EventFormType = z.infer<typeof EventForm>

type propType = {
  selectDate: Date ,
  userId:string
  setDate: React.Dispatch<React.SetStateAction<Date>>
}



export default function Modal({ selectDate, setDate,userId }: propType) {
  const [open,setOpen]=useState<boolean>(false)
  const form = useForm<EventFormType>({
    resolver: zodResolver(EventForm),
    defaultValues: {
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      startTime: "10:00",
      endTime: "11:00",
    }
  })
  const {mutate,isPending,error}=useCreateEvent()

  const onSubmit = (data:EventFormType) => {
    try{
      const {title,description,date,startTime,endTime}=data
      mutate({title,description,date:new Date(date),userId, startTime,endTime})
      toast.success('Event added successful')
      form.reset()
      setOpen(false)
    }catch(error){console.log(error)}
  }


  if(error){
    toast.error(error.message)
  }

  return (
    <aside className="md:w-80 md:bg-white p-6 border-r md:dark:bg-gray-950">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">My Calendar</h2>
        <ModeToggle />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full mb-4">
            {/* <PlusCircle className="mr-2 h-4 w-4" /> */}
            Add Event
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>

          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="py-4 grid gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
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
                    <FormLabel className="font-semibold">Discription</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Discription" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <Button type="submit" disabled={isPending}>Add Event</Button>
            </form>
          </Form>

        </DialogContent>
      </Dialog>
      <Calendar
        mode="single"
        selected={selectDate}
        onSelect={(day)=>setDate(day as Date)}
        className="rounded-md border flex justify-center"
      />
    </aside>
  );
}
