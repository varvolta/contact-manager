import {ContactForm} from '../components/ContactForm.tsx';
import {useContactMutations} from '../hooks/useContacts';
import {useNavigate} from '@tanstack/react-router';

export function NewContactPage() {
    const navigate = useNavigate();
    const {createContact} = useContactMutations();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Create New Contact</h1>
            <ContactForm
                onSubmit={async (data) => {
                    await createContact.mutateAsync(data);
                    await navigate({to: '/'});
                }}
                onCancel={() => navigate({to: '/'})}
            />
        </div>
    );
}