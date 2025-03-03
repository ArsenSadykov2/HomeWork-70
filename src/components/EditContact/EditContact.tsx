import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../../axiosApi.ts";
import { User } from "../../types";
import AddForm from "../AddForm/AddForm.tsx";

const EditContact = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { idContact } = useParams();
    const [contact, setContact] = useState<User | null>(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                setLoading(true);
                const response = await axiosApi.get<User>(`/contacts/${idContact}.json`);
                setContact(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке контакта:", error);
            } finally {
                setLoading(false);
            }
        };

        if (idContact) {
            fetchContact();
        }
    }, [idContact]);

    const updateContact = async (updatedContact: User) => {
        try {
            setLoading(true);
            await axiosApi.put(`/contacts/${idContact}.json`, updatedContact);
            navigate('/');
        } catch (error) {
            console.error("Ошибка при обновлении контакта:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!contact) {
        return <div>Контакт не найден</div>;
    }

    return (
        <div className="row">
            <div className="col">
                <AddForm
                    onSubmitFormToAddContact={updateContact}
                    editContact={contact}
                />
            </div>
        </div>
    );
};

export default EditContact;