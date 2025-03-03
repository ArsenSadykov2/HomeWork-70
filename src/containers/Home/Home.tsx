import Toolbar from "../../components/ToolBar/ToolBar.tsx";
import Contacts from "../../components/Contacts/Contacts.tsx";
import { useCallback, useEffect, useState } from "react";
import { Contact, ContactAPI } from "../../types";
import axiosApi from "../../axiosApi.ts";
import Modal from "../../components/UI/Modal/Modal.tsx";
import {useNavigate} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader.tsx";

const imageUrl = 'data:image/jpeg;base64,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';


const Home = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const navigate = useNavigate();

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

    const deleteContact = async () => {
        if (selectedContact && selectedContact.id) {
            try {
                await axiosApi.delete(`/contacts/${selectedContact.id}.json`);
                setContacts(contacts.filter(contact => contact.id !== selectedContact.id));
                closeModal();
            } catch (e) {
                console.error("Ошибка при удалении контакта:", e);
            }
        }
    };

    const editContact = () => {
        if (selectedContact) {
            navigate(`/edit-contacts/${selectedContact.id}`);
        }
    };

    return (
        <div>
            <header className="container mb-2">
                <Toolbar />
            </header>
            {loading ? <Loader/> : <main>
                <div className="container">
                    <Contacts contacts={contacts} onClickItem={handleContactClick}/>
                </div>
                <Modal show={showModal} title="Информация о контакте" onClose={closeModal}>
                    <div className="modal-body">
                        {selectedContact && (
                            <>
                                <img src={selectedContact.image ? selectedContact.image : imageUrl}
                                     alt={selectedContact.name} className="img-fluid mb-3"/>
                                <hr/>
                                <h4>Name: {selectedContact.name}</h4>
                                <p><strong>Телефон:</strong> {selectedContact.phone}</p>
                                <p><strong>Email:</strong> {selectedContact.email}</p>
                            </>
                        )}
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <button className="btn btn-danger" onClick={deleteContact}>
                            Удалить
                        </button>
                        <button className="btn btn-primary" onClick={editContact}>
                            Редактировать
                        </button>
                    </div>
                </Modal>
            </main>}
        </div>
    );
};

export default Home;