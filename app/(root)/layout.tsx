import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import Navbar from '@/app/components/Navbar';

export default function Layout({children}: Readonly<{children: ReactNode}>): ReactElement {
    return ( 
        <main className='min-h-screen bg-gradient-to-b from-gray-900 to-black'>
            <Navbar />

            {children}
        </main>
     );
}
