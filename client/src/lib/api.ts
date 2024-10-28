import axios from 'axios'

type propType = { title: string, description: string|undefined, date: Date, userId: string,startTime:string,endTime:string }
function getDateDetails(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    
    const startOfMonth = new Date(year, date.getMonth(), 1);
    const dayOfWeek = startOfMonth.getDay();
    const adjustedDate = date.getDate() + dayOfWeek; 
    const week = Math.ceil(adjustedDate / 7);
  
    return { year, month, day, week };
  }

const BASE_URL=import.meta.env.VITE_BASE_URL

export async function getEvents({userId,date,view}:{userId:string,date:Date,view:string}) {
    try {
        
        const {year,month,day,week}=getDateDetails(date)
        const { data } = await axios.get(`${BASE_URL}/events?day=${day}&month=${month}&week=${week}&year=${year},`, {
            headers: {
                "x-user-id": userId,
                "x-view":view
            }
        })
        return data.data 
    } catch (error) {
        console.log('error while fetching events: ', error)

    }
}


export async function getEvent(id: string, userId: string) {
    try {
        const { data } = await axios.get(`${BASE_URL}/event/${id}`, {
            headers: {
                "x-user-id": userId
            }
        })
        return data.data||[]
    } catch (error) {
        console.log('error whiile fetching event', error)
    }
}

export async function createEvent({ title, description, date, userId,startTime,endTime }: propType) {
    try {
        const { data } = await axios.post(`${BASE_URL}/event`, {
            title, description, date,startTime,endTime
        }, {
            headers: {
                "x-user-id": userId
            }
        })
        return data
    } catch (error) {
        console.log('error while creating event: ', error)
    }
}

export async function updateEvent({ title, description, date, id, userId,startTime,endTime }: propType & { id: string }) {
    try {
        const { data } = await axios.patch(`${BASE_URL}/event/${id}`, {
            title, description, date,startTime,endTime
        }, {
            headers: {
                "x-user-id": userId
            }
        })
        return data
    } catch (error) {
        console.log('error while updating the event: ', error)
    }
}

export async function deleteEvent(id: string, userId: string) {
    try {
        const { data } = await axios.delete(`${BASE_URL}/event/${id}`, {
            headers: {
                "x-user-id": userId
            }
        })
        return data
    } catch (error) {
        console.log('error while deleting event: ', error)
    }
}


