import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {api} from '../lib/api';
import type {Contact} from '../types/contact';
import type {ContactFormData} from '../schemas/contactSchema';

export function useContacts() {
    return useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
            const {data} = await api.get<Contact[]>('/users');
            return data;
        },
    });
}

export function useContact(id: number) {
    return useQuery({
        queryKey: ['contacts', id],
        queryFn: async () => {
            const {data} = await api.get<Contact>(`/users/${id}`);
            return data;
        },
    });
}

export function useContactMutations() {
    const queryClient = useQueryClient();

    const createContact = useMutation({
        mutationFn: async (newContact: ContactFormData) => {
            const {data} = await api.post<Contact>('/users', newContact);
            return data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['contacts']});
        },
    });

    const updateContact = useMutation({
        mutationFn: async ({id, ...contact}: Contact) => {
            const {data} = await api.put<Contact>(`/users/${id}`, contact);
            return data;
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({queryKey: ['contacts', data.id]});
            await queryClient.invalidateQueries({queryKey: ['contacts']});
        },
    });

    const deleteContact = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/users/${id}`);
            return id;
        },
        onSuccess: async (id) => {
            queryClient.removeQueries({queryKey: ['contacts', id]});
            await queryClient.invalidateQueries({queryKey: ['contacts']});
        },
    });

    return {
        createContact,
        updateContact,
        deleteContact,
    };
}