import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import Events from '@/components/Events'
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export default function HomePage() {
    const [date, setDate] = useState(new Date())
    const router = useNavigate()
    const { userId, isLoaded } = useAuth()


    useEffect(() => {
        if (!userId && isLoaded) {
            router('/signup', { replace: true })
        }
    }, [userId, router, isLoaded])



    return (
        <div className="md:flex min-h-screen bg-gray-100  dark:bg-gray-900">
            <Modal selectDate={date} setDate={setDate} userId={userId as string}/>
            <Events date={date} userId={userId as string} setDate={setDate}/>
        </div>
    );
}