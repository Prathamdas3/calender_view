import { Dispatch, SetStateAction, useState } from 'react'
import { format, addMonths, addWeeks, addDays, startOfWeek } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DayView from './views/DayView'
import MonthView from './views/MonthView'
import WeekView from './views/WeekView'
import { signOut } from 'firebase/auth'
import { auth } from './provider/firebase'
import { useNavigate } from 'react-router-dom'

export type Event = {
  id: string;
  title: string;
  description?: string;
  date: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  start_time: string,
  end_time: string
};



export default function Events({ date, userId, setDate }: { date: Date, userId: string, setDate: Dispatch<SetStateAction<Date>> }) {
  const [view, setView] = useState<'month' | 'week' | 'day'>('day')

  
  const changeDate = (amount: number) => {
    setDate(prevDate => {
      switch (view) {
        case 'month':
          return addMonths(prevDate, amount)
        case 'week':
          return addWeeks(prevDate, amount)
        case 'day':
          return addDays(prevDate, amount)
      }
    })
  }
  const router=useNavigate()
  const handleLogOut=()=>{
    signOut(auth)
    router('/auth')
  }


  return (
    <div className="container mx-auto ">
      <div className="flex justify-between items-center mb-4 flex-col lg:flex-row">
        <h2 className="text-2xl font-bold">
          {view === 'month' && format(date, 'MMMM yyyy')}
          {view === 'week' && `Week of ${format(startOfWeek(date), 'MMM d, yyyy')}`}
          {view === 'day' && `Events for ${format(date, 'MMMM d, yyyy')}`}
        </h2>
        <div className="flex items-center gap-4 mb-2 mt-4 flex-col md:flex-row">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={() => changeDate(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => changeDate(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Select value={view} onValueChange={(value: 'month' | 'week' | 'day') => setView(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="month">Month</SelectItem> */}
                {/* <SelectItem value="week">Week</SelectItem> */}
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="bg-red-500 dark:text-white dark:bg-red-700" onClick={handleLogOut}>
            Log out
          </Button>


        </div>
      </div>

      {view === 'month' && <MonthView view={view} userId={userId} date={date} />}
      {view === 'week' && <WeekView view={view} userId={userId} date={date} />}
      {view === 'day' && <DayView view={view} userId={userId} date={date} />}
    </div>
  )
}

