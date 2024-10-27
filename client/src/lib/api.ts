import axios from 'axios'

type propType = { title: string, description: string|undefined, date: Date, userId: string,startTime:string,endTime:string }

export async function getEvents(userId: string) {
    try {
        const { data } = await axios.get('http://localhost:8000/api/events', {
            headers: {
                "x-user-id": userId
            }
        })
        
        return data.data 
    } catch (error) {
        console.log('error while fetching events: ', error)

    }
}


export async function getEvent(id: string, userId: string) {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/event/${id}`, {
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
        const { data } = await axios.post('http://localhost:8000/api/event', {
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
        const { data } = await axios.patch('http://localhost:8000/api/event/' + id, {
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
        const { data } = await axios.delete(`http://localhost:8000/api/event/${id}`, {
            headers: {
                "x-user-id": userId
            }
        })
        return data
    } catch (error) {
        console.log('error while deleting event: ', error)
    }
}


