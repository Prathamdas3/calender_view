import { useEvents } from "@/hooks";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import EventCard from "./EventCard";

export type Event = {
  id: string;
  title: string;
  description?: string;
  date: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  start_time:string,
  end_time:string
};

export default function EventsSection({ date, userId }: { date: Date | undefined, userId: string }) {
  const [view, setView] = useState<'day' | 'week' | 'month'>('day')
  const { data, error } = useEvents(userId)


  if (error) {
    console.log(error.message)
  }

  return (
    <main className="flex-1 p-6 min-h-screen">
      <div className="flex justify-between items-center flex-col md:flex-row">
        <h2 className="md:text-2xl text-xl font-bold mb-6 ">Events for {(new Date()).toDateString()}</h2>
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

          <SignedIn>
            <Button className="bg-red-500 dark:text-white dark:bg-red-700">
              Log out
            </Button>
          </SignedIn>
          <SignedOut>
            <Button className="py-4">SignUp / Login</Button>
          </SignedOut>
        </div>

      </div>
      <div className=" border border-gray-400 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-800 min-h-[95%] w-full ">
        <ScrollArea className="flex flex-col justify-start w-full p-4 ">
          {Array.isArray(data) && data.length > 0 ? (
            data
              .filter((event: Event) =>
                typeof event.date === 'string'
                  ? new Date(event.date).toDateString() === date?.toDateString()
                  : event.date.toDateString() === date?.toDateString()
              )
              .map((event: Event) => (
                <EventCard key={event.id} data={event} userId={userId} />
              ))
          ) : (
            <div className="flex flex-col justify-center items-center w-full min-h-[80vh] text-2xl font-semibold"><p>No events found.</p></div>

          )}
        </ScrollArea>
      </div>
    </main>
  );
}