import {useParams} from '@tanstack/react-router';
import {ContactView} from '../components/ContactView.tsx';
import {useContacts} from '../hooks/useContacts';

export function ContactDetailsPage() {
    const {contactId} = useParams({from: '/contacts/$contactId'});
    const {data: contacts, isLoading} = useContacts();
    const contact = contacts?.find(c => c.id === parseInt(contactId));

    if (isLoading) return <div>Loading...</div>;
    if (!contact) return <div>Contact not found</div>;

    return <ContactView contact={contact}/>;
}