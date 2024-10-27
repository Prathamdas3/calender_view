import { createEvent, getEvent, getEvents, updateEvent, deleteEvent, } from '@/lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useEvents = (userId:string) => {
   
    const { data, isLoading, error } = useQuery({ queryKey: ['getEvents'], queryFn: async () => await getEvents(userId ) })
    return {
        data, isLoading, error
    }
}

export const useEvent = (id: string,userId:string) => {
    const { data, isLoading, error } = useQuery({ queryKey: ['getEvent', id], queryFn: async () => await getEvent(id,userId ) })
    return {
        data, isLoading, error
    }
}

export const useCreateEvent = () => {
    const queryClient = useQueryClient()
    const { error, isPending, mutate } = useMutation({
        mutationKey: ['createEvent'],
        mutationFn: async ({ title, description, date,userId ,startTime,endTime}: { title: string, description: string|undefined, date: Date,userId:string,startTime:string,endTime:string }) => await createEvent({ title, description, date,userId,startTime,endTime}),
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
        mutationFn: async ({ title, description, date, id ,userId,startTime,endTime}: { title: string, description: string|undefined, date: Date, id: string,userId:string,startTime:string,endTime:string }) => await updateEvent({ title, description, date, id,userId,startTime,endTime }),
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

export const useDeleteEvent = () => {
    const queryClient = useQueryClient()

    const { error, isPending, mutate } = useMutation({
        mutationKey: ['deleteEvent'],
        mutationFn: async ({id,userId}:{id: string, userId:string}) => await deleteEvent(id,userId),
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