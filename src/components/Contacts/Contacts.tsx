import React from 'react';
import { Contact } from '../../types';

interface ContactsProps {
    contacts: Contact[];
    onClickItem: (contact: Contact) => void;
}

const Contacts: React.FC<ContactsProps> = ({ contacts, onClickItem }) => {
    return (
        <div className="row">
            {contacts.map((contact) => (
                <div key={contact.id} className="col-md-4 mb-4" onClick={() => onClickItem(contact)}>
                    <div className="card">
                        <img src={contact.image} className="card-img-top" alt={contact.name} />
                        <div className="card-body">
                            <h5 className="card-title">{contact.name}</h5>
                            <p className="card-text">{contact.phone}</p>
                            <p className="card-text">{contact.email}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Contacts;