// import { useEvents } from "@/hooks";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export default function EventsSection({ date }: { date: Date | undefined }) {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week')
  //  const {data,isLoadin,error}=useEvents()
  //   useEffect(()=>{

  //   },)
  console.log(date)
  return (
    <main className="flex-1 p-6 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-6">Events for {(new Date()).toDateString()}</h2>
        <div className="flex items-center gap-4 mb-2">
          <Select value={view} onValueChange={(value: 'day' | 'week' | 'month') => setView(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <Button className="">Get All Events</Button>
          <SignedIn>
            <Button className="bg-red-500">
              Log out
            </Button>
          </SignedIn>
          <SignedOut>
            <Button className="py-4">SignUp / Login</Button>
          </SignedOut>
        </div>

      </div>
      <div className="w-full border border-gray-400 rounded-lg bg-gray-200 h-[95%] flex justify-center items-center">
        <ScrollArea className="">
          {/* {events
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
        ))} */}
        </ScrollArea>
      </div>
    </main>
  );
}