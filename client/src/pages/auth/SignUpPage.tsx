import { SignUp } from '@clerk/clerk-react'

export default function SignUpPage() {
    return <main className='flex flex-col justify-center items-center min-h-screen'><SignUp path="/signup" afterSignOutUrl='/' /></main>
}
