import Toolbar from "../../components/ToolBar/ToolBar.tsx";
import Contacts from "../../components/Contacts/Contacts.tsx";
import { useCallback, useEffect, useState } from "react";
import { Contact, ContactAPI } from "../../types";
import axiosApi from "../../axiosApi.ts";

const Home = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchContacts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosApi<ContactAPI | null>('/contacts.json');
            const contactsListObject = response.data;

            if (!contactsListObject) {
                setContacts([]);
                return;
            } else {
                const contactsListArray: Contact[] = Object.keys(contactsListObject).map((contactId) => {
                    const contact = contactsListObject[contactId];
                    return {
                        ...contact,
                        id: contactId,
                    };
                });
                setContacts(contactsListArray);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (location.pathname === '/') {
            void fetchContacts();
        }
    }, [fetchContacts, location]);

    const handleContactClick = (contact: Contact) => {
        console.log('Clicked contact:', contact);
    };

    return (
        <div>
            <header className="container mb-2">
                <Toolbar />
            </header>
            <main>
                <div className="container">
                    <Contacts contacts={contacts} onClickItem={handleContactClick} />
                </div>
            </main>
        </div>
    );
};

export default Home;