import { useEvents } from "@/hooks"
import { eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, parseISO, startOfMonth, startOfWeek } from "date-fns"
import { Event } from "../Events"


export default function MonthView({ date, userId, view,  }: { date: Date, userId: string, view: string }) {
  const start = startOfWeek(startOfMonth(date))
  const end = endOfWeek(endOfMonth(date))
  const days = eachDayOfInterval({ start, end })
  const { data } = useEvents({ date, view, userId })
  // const handleOnClick = (date: Date) => {
  //   setDate(date)
  //   setView('day')
  // }

  return (
    <div className="grid grid-cols-7 gap-1 text-black dark:text-white">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
        <div key={day} className="text-center font-semibold py-2">{day}</div>
      ))}
      {days.map(day => {
        const dayEvents = data.filter((event: Event) => isSameDay(parseISO(event.date), day))
        return (
          <div
            key={day.toString()}
            className={`p-2 h-40 border ${isSameMonth(day, date) ? 'bg-black dark:text-white' : 'bg-gray-100 dark:bg-gray-900'}`}
          >
            <div className="text-right">{format(day, 'd')}</div>
            {dayEvents.map((event: Event) => (
              <div key={event.id} className={`text-xs mt-1 p-1 rounded  text-black dark:text-white`} >
                {event.title}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}