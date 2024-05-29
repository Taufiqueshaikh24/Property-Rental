
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';
import AuthProvider from '@/components/AuthProvider';
import 'photoswipe/dist/photoswipe.css'
import { GlobalProvider } from '@/context/GlobalContext';

export const metadata = {
    title : 'Property Pulse | Find the perfect renatal place', 
    description :'Find your dream rental property', 
    keywords : 'rental , findrental , properties , Home , condo'
}

export default function RootLayout({children}){
    return (
        <GlobalProvider>

        <AuthProvider>

         <html lang="en">
            <body>
                <Navbar />
                <div>{children}</div>
                <Footer />
                <ToastContainer />
            </body>
         </html>
        </AuthProvider>
        </GlobalProvider>
    )
}