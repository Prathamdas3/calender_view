import { useEvents } from "@/hooks"
import { ScrollArea } from "../ui/scroll-area"
import type { Event } from "../Events"
import EventCard from "../EventCard"
import { isSameDay, parseISO } from "date-fns"

export default function DayView({ userId, date,view }: { userId: string, date: Date,view:string }) {
    const { data,error } = useEvents({date,view,userId})


    if (error) {
        console.error("Error fetching events:", error);
        return <div>Error loading events: {error.message}</div>;
      }
   
      if (!data || data.length === 0) {
        return <div className="border border-gray-400 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-800 min-h-[90%] w-full flex flex-col justify-center items-center font-bold text-2xl ">No events today.</div>;
      }

      const filteredEvents = data.filter((event: Event) => {
        const eventDate = parseISO(event.date.toString());
        return isSameDay(date, eventDate);
      });
    
      if (filteredEvents.length === 0) {
        return <div className="border border-gray-400 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-800 min-h-[90%] w-full flex flex-col justify-center items-center font-bold text-2xl ">No events today.</div>;
      }

      const sortedEvents = filteredEvents.sort((a:Event, b:Event) => {
        const startTimeA = parseISO(`${date.toISOString().split('T')[0]}T${a.start_time}:00`);
        const startTimeB = parseISO(`${date.toISOString().split('T')[0]}T${b.start_time}:00`);
        return startTimeA.getTime() - startTimeB.getTime();
      });


    return (
        <div className=" border border-gray-400 dark:border-gray-600 rounded-lg bg-gray-200 dark:bg-gray-800 min-h-[90%] w-full ">
                <ScrollArea className="flex flex-col justify-start w-full p-4 ">
                  {
                     sortedEvents.map((event: Event) => (
                        <EventCard key={event.id} data={event} userId={userId} />
                      ))
                    }
                </ScrollArea>
              </div>
        
    )
}




