import axios from 'axios'

type propType = { title: string, description: string, date: Date }

export async function getEvents() {
    try {
        const { data } = await axios.get('http://localhost:8000/api/events')
        return data
    } catch (error) {
        console.log('error while fetching events: ', error)
    }
}

// export async function getEventsAccordingToDate(date: string) {
//     try {
//         const { data } = await axios.get('http://localhost:8000/api/events' + date)
//         return data
//     } catch (error) {
//         console.log('error while fetching events according to date', error)
//     }
// }

export async function getEvent(id: string) {
    try {
        const { data } = await axios.get('http://localhost:8000/api/event/' + id)
        return data
    } catch (error) {
        console.log('error whiile fetching event', error)
    }
}

export async function createEvent({ title, description, date }: propType) {
    try {
        const { data } = await axios.post('http://localhost:8000/api/event', {
            title, description, date
        })
        return data
    } catch (error) {
        console.log('error while creating event: ', error)
    }
}

export async function updateEvent({ title, description, date, id }: propType & { id: string }) {
    try {
        const { data } = await axios.patch('http://localhost:8000/api/event/' + id, {
            title, description, date
        })
        return data
    } catch (error) {
        console.log('error while updating the event: ', error)
    }
}

export async function deleteEvent(id: string) {
    try {
        const { data } = await axios.delete('http://localhost:8000/api/event' + id)
        return data
    } catch (error) {
        console.log('error while deleting event: ', error)
    }
}


