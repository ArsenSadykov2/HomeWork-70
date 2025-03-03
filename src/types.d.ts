export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
}

export interface User {
    name: string;
    email: string;
    phone: string;
    image: string;
}

export interface ContactAPI  {
    [id: string]: User;
}