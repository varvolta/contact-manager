import {useForm} from '@tanstack/react-form';
import {contactSchema, type ContactFormData} from '../schemas/contactSchema';

interface ContactFormProps {
    initialData?: ContactFormData;
    onSubmit: (data: ContactFormData) => Promise<void>;
    onCancel: () => void;
}

export function ContactForm({initialData, onSubmit, onCancel}: ContactFormProps) {
    const form = useForm({
        defaultValues: initialData,
        onSubmit: async ({value}) => {
            return onSubmit(value);
        },
        validators: {
            onChange: contactSchema
        },
    });

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await form.handleSubmit();
            }}
            className="space-y-4"
        >
            <form.Field name="name">
                {(field) => (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.errors ? (
                            <div className="mt-1 text-sm text-red-600">
                                {field.state.meta.errors}
                            </div>
                        ) : null}
                    </div>
                )}
            </form.Field>

            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={form.state.isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                    {form.state.isSubmitting ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
}