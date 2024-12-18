import {useState} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {Contact} from '../types/contact';
import {ContactForm} from './ContactForm';
import {useContactMutations} from '../hooks/useContacts';
import {motion} from 'framer-motion';

interface ContactViewProps {
    contact: Contact;
}

export function ContactView({contact}: ContactViewProps) {
    const [isEditing, setIsEditing] = useState(false);
    const {updateContact, deleteContact} = useContactMutations();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this contact?')) {
            await deleteContact.mutateAsync(contact.id);
            await navigate({to: '/'});
        }
    };

    if (isEditing) {
        return (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="p-6"
            >
                <ContactForm
                    initialData={contact}
                    onSubmit={async (data) => {
                        await updateContact.mutateAsync({id: contact.id, ...data});
                        setIsEditing(false);
                    }}
                    onCancel={() => setIsEditing(false)}
                />
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            className="p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                        {contact.avatar ? (
                            <img
                                src={contact.avatar}
                                alt={contact.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">
                                {contact.name[0]}
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{contact.name}</h1>
                        <p className="text-gray-600">@{contact.username}</p>
                    </div>
                </div>
                <div className="space-x-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h2 className="text-sm font-medium text-gray-500">Email</h2>
                    <p className="mt-1">{contact.email}</p>
                </div>
                <div>
                    <h2 className="text-sm font-medium text-gray-500">Phone</h2>
                    <p className="mt-1">{contact.phone}</p>
                </div>
                {contact.description && (
                    <div>
                        <h2 className="text-sm font-medium text-gray-500">About</h2>
                        <p className="mt-1">{contact.description}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}