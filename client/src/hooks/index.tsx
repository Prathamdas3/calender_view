import { createEvent, getEvent, getEvents, updateEvent,deleteEvent, } from '@/lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useEvents = () => {
    const { data, isLoading, error } = useQuery({ queryKey: ['getEvents'], queryFn: async () => await getEvents() })
    return {
        data, isLoading, error
    }
}


// export const useEventsAccordingToDate=(date:string)=>{
//     const {data,isLoading,error}=useQuery({queryKey:["getEventsAccordingtoDate",date],queryFn:async()=>await getEventsAccordingToDate(date)})
//     return {
//         data,isLoading,error
//     }
// }

export const useEvent = (id: string) => {
    const { data, isLoading, error } = useQuery({ queryKey: ['getEvent',id], queryFn: async () => await getEvent(id) })
    return {
        data, isLoading, error
    }
}


export const useCreateEvent = () => {
    const queryClient = useQueryClient()
    const { error, isPending, mutate } = useMutation({
        mutationKey: ['createEvent'],
        mutationFn: async ({ title, description, date }: { title: string, description: string, date: Date }) => await createEvent({ title, description, date }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getEvents'], exact: true,
                refetchType: 'active',

            }, { throwOnError: true, cancelRefetch: true })
        }
    })
    return {
        error,
        isPending,
        mutate
    }
}


export const useUpdateEvent = () => {
    const queryClient = useQueryClient()

    const { error, isPending, mutate } = useMutation({
        mutationKey: ['updateEvent'],
        mutationFn: async ({ title, description, date, id }: { title: string, description: string, date: Date, id: string }) => await updateEvent({ title, description, date, id }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getEvents'], exact: true,
                refetchType: 'active',

            }, { throwOnError: true, cancelRefetch: true })
        }
    })
    return {
        error,
        isPending,
        mutate
    }

}

export const useDeleteEvent=()=>{
    const queryClient=useQueryClient()

    const { error, isPending, mutate } = useMutation({
        mutationKey: ['deleteEvent'],
        mutationFn: async (id:string) => await deleteEvent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getEvents'], exact: true,
                refetchType: 'active',

            }, { throwOnError: true, cancelRefetch: true })
        }
    })
    return {
        error,
        isPending,
        mutate
    }
}