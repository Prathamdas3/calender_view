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

const EventForm = z.object({
  title: z.string().min(8, 'minimum length of the should be 8'),
  description: z.string().min(20, 'minimum length should be 20').optional(),
  date: z.string().min(10, 'date must be in YYYY-MM-DD format')
})

type EventFormType = z.infer<typeof EventForm>

type propType = {
  date: Date | undefined,
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}



export default function Modal({ date, setDate }: propType) {
  const form = useForm<EventFormType>({
    resolver: zodResolver(EventForm),
    defaultValues: {
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    }
  })

  const onSubmit = () => {

  }

  return (
    <aside className="md:w-80 bg-white p-6 border-r ">
      <div className="flex justify-between"><h2 className="text-2xl font-bold mb-6">My Calendar</h2>
        <ModeToggle />
      </div>

      <Dialog>
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
            </form>
            <Button type="submit">Add Event</Button>
          </Form>

        </DialogContent>
      </Dialog>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border flex justify-center"
      />
    </aside>
  );
}
