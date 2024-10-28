import { useEvents } from "@/hooks"
import { eachDayOfInterval,  endOfWeek, format, isSameDay,  parseISO,  setHours,  startOfWeek } from "date-fns"
import { Event } from "../Events"
import { ScrollArea } from "../ui/scroll-area"
import React from "react"
    
    export default function WeekView  ({ userId, date,view }: { userId: string, date: Date,view:string }) {
      const start = startOfWeek(date)
      const end = endOfWeek(date)
      const days = eachDayOfInterval({ start, end })
      const hours = Array.from({ length: 24 }, (_, i) => i)
      const { data } = useEvents({ date, view, userId })
      console.log(data)

      return (
        <div className="grid grid-cols-8 gap-1">
          <div className="col-span-1"></div>
          {days.map(day => (
            <div key={day.toString()} className="text-center font-semibold py-2">
              {format(day, 'EEE')}
              <br />
              {format(day, 'd')}
            </div>
          ))}
          <ScrollArea className="h-[600px] col-span-8 ">
            <div className="grid grid-cols-8 gap-1">
              {hours.map(hour => (
                <React.Fragment key={hour}>
                  <div className="text-right pr-2">{format(setHours(new Date(), hour), 'h a')}</div>
                  {days.map(day => {
                    const hourEvents = data.filter((event:Event) => 
                      isSameDay(parseISO(event.date), day) && 
                      event.start_time && 
                      parseInt(event.start_time.split(':')[0]) === hour
                    )
                    return (
                      <div key={`${day}-${hour}`} className="border h-12 relative">
                        {hourEvents.map((event:Event) => (
                          <div 
                            key={event.id} 
                            className={`absolute left-0 right-0 text-white text-xs p-1 overflow-hidden`}
                            style={{
                              top: `${parseInt(event.start_time!.split(':')[1]) / 60 * 100}%`,
                              height: `${(parseInt(event.end_time!.split(':')[0]) - parseInt(event.start_time!.split(':')[0])) * 100}%`
                            }}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        </div>
      )
    }