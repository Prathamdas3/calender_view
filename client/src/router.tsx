import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/theme-provider'
import { lazy, Suspense } from 'react'
import LoadingPage from '@/pages/LoadingPage'
import { Toaster } from 'sonner'
import { ClerkProvider } from '@clerk/clerk-react'


const HomePage = lazy(() => import('@/pages/HomePage'))
const SignInPage = lazy(() => import('@/pages/auth/SignInPage'))
const SignUpPage = lazy(() => import('@/pages/auth/SignUpPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const EmailVericationPage=lazy(()=>import('./pages/EmailverificationPage'))

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const queryClient = new QueryClient()

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

export default function App() {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                        <Suspense fallback={<LoadingPage />}>
                            <Routes>
                                <Route path='/' element={<HomePage />} />
                                <Route path='/signup' element={<SignUpPage />} />
                                <Route path='/signin' element={<SignInPage />} />
                                <Route path='/signup/verify-email-address' element={<EmailVericationPage/>}/>                               
                                 <Route path='*' element={<NotFoundPage />} />
                            </Routes>
                            <Toaster />
                        </Suspense>
                    </ThemeProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </ClerkProvider>
    );
}