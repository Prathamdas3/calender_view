import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import Events from '@/components/Events'
import { useNavigate } from "react-router-dom";
import { auth } from "@/components/provider/firebase";
import { onAuthStateChanged, User } from "firebase/auth";


export default function HomePage() {
    const [date, setDate] = useState(new Date())
    const [userId,setUserId]=useState<string|null>(null)
    const router = useNavigate()


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
          if (user) {
            setUserId(user.uid); 
          } else {
            setUserId(null);
            router('/auth')
          }
        });
        return () => unsubscribe();
      }, [router]);
      
    return (
        <div className="md:flex min-h-screen bg-gray-100  dark:bg-gray-900">
            <Modal selectDate={date} setDate={setDate} userId={userId as string}/>
            <Events date={date} userId={userId as string} setDate={setDate}/>
        </div>
    );
}