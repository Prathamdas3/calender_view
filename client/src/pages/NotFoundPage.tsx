import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom'
export default function NotFoundPage() {
    const router = useNavigate()
    return (
        <main className="min-h-screen flex flex-col gap-4 justify-center items-center">
            <h2 className="text-2xl font-bold">404 | Page not found</h2>
            <Button variant='outline'  onClick={() => router('/')} >Back to safety</Button>
        </main>
    );
}