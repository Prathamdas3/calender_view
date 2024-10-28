import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/provider/theme-provider'
import { lazy, Suspense } from 'react'
import { Toaster } from 'sonner'

const HomePage = lazy(() => import('@/pages/HomePage'))
const AuthPage=lazy(()=>import ('@/pages/AuthPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const queryClient = new QueryClient()


export default function App() {
    return (
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                        <Suspense fallback={<div className='flex flex-col items-center justify-center min-h-screen text-black dark:text-white font-semibold text-2xl'>Loading ...</div>}>
                            <Routes>
                                <Route path='/' element={<HomePage />} />
                               <Route path='/auth' element={<AuthPage/>}/>
                                <Route path='*' element={<NotFoundPage />} />
                            </Routes>
                            <Toaster />
                        </Suspense>
                    </ThemeProvider>
                </QueryClientProvider>
            </BrowserRouter>
       
    );
}