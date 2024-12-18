export interface Contact {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    favorite?: boolean;
    avatar?: string;
    description?: string;
}