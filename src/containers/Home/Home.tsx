import Toolbar from "../../components/ToolBar/ToolBar.tsx";
import Contacts from "../../components/Contacts/Contacts.tsx";
import { useCallback, useEffect, useState } from "react";
import { Contact, ContactAPI } from "../../types";
import axiosApi from "../../axiosApi.ts";
import Modal from "../../components/UI/Modal/Modal.tsx";

const Home = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

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
        setSelectedContact(contact);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedContact(null);
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
                <Modal show={showModal} title="Информация о контакте" onClose={closeModal}>
                    <div className="modal-body">
                        {selectedContact && (
                            <>
                                <img src={selectedContact.image} alt={selectedContact.name} className="img-fluid mb-3" />
                                <h4>{selectedContact.name}</h4>
                                <p><strong>Телефон:</strong> {selectedContact.phone}</p>
                                <p><strong>Email:</strong> {selectedContact.email}</p>
                            </>
                        )}
                    </div>
                </Modal>
            </main>
        </div>
    );
};

export default Home;