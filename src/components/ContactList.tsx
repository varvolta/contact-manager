import {useState} from 'react';
import {Link, useNavigate} from '@tanstack/react-router';
import {useContacts} from '../hooks/useContacts';
import {motion, AnimatePresence} from 'framer-motion';

export function ContactList() {
    const [searchTerm, setSearchTerm] = useState('');
    const {data: contacts, isLoading, error} = useContacts();
    const navigate = useNavigate();

    const filteredContacts = contacts?.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-80 border-r h-screen bg-gray-50">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Contacts</h2>
                    <button
                        onClick={() => navigate({to: '/contacts/new'})}
                        className="p-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        New Contact
                    </button>
                </div>

                <input
                    type="search"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {isLoading ? (
                <div className="p-4 text-center">Loading...</div>
            ) : error ? (
                <div className="p-4 text-red-600">Error loading contacts</div>
            ) : (
                <AnimatePresence>
                    <motion.ul
                        className="space-y-1 p-2"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                    >
                        {filteredContacts?.map((contact) => (
                            <motion.li
                                key={contact.id}
                                layout
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                            >
                                <Link
                                    to="/contacts/$contactId"
                                    params={{contactId: contact.id.toString()}}
                                    className="block p-3 rounded-md hover:bg-white hover:shadow-sm transition-all"
                                    activeProps={{
                                        className: 'bg-white shadow-sm border-l-4 border-blue-500',
                                    }}
                                >
                                    <div className="font-medium">{contact.name}</div>
                                    <div className="text-sm text-gray-500">{contact.email}</div>
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                </AnimatePresence>
            )}
        </div>
    );
}