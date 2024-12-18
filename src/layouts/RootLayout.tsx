import {Outlet} from '@tanstack/react-router';
import {ContactList} from '../components/ContactList.tsx';

export function RootLayout() {
    return (
        <div className="flex min-h-screen">
            <ContactList/>
            <main className="flex-1 bg-gray-50">
                <Outlet/>
            </main>
        </div>
    );
}