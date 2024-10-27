import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
// import { useToast } from "@/components/ui/use-toast"
// import { CalendarIcon, PlusCircle } from "lucide-react"

type Event = {
  id: string
  title: string
  date: Date
  description: string
}

export default function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({ title: '', date: new Date(), description: '' })
//   const { toast } = useToast()

  const handleAddEvent = () => {
    const event = { ...newEvent, id: Date.now().toString() }
    setEvents([...events, event])
    setNewEvent({ title: '', date: new Date(), description: '' })
    // toast({
    //   title: "Event added",
    //   description: "Your new event has been added to the calendar.",
    // })
  }

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id))
    // toast({
    //   title: "Event deleted",
    //   description: "The event has been removed from your calendar.",
    // })
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white p-6 border-r">
        <h2 className="text-2xl font-bold mb-6">My Calendar</h2>
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
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date.toISOString().split('T')[0]}
                  onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogContent>
        </Dialog>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </aside>
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Events for {date?.toDateString()}</h2>
        <div className="space-y-4">
          {events
            .filter(event => event.date.toDateString() === date?.toDateString())
            .map(event => (
              <div key={event.id} className="bg-white p-4 rounded-md shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  )
}