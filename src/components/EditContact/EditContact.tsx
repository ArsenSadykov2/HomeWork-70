import {useNavigate, useParams} from "react-router-dom";
import axiosApi from "../../axiosApi.ts";
import {useState} from "react";
import {User} from "../../types";
import AddForm from "../AddForm/AddForm.tsx";

const EditContact = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {idContact} = useParams();
    const createDish = async (newContact: User) => {
        try{
            setLoading(true);
            await axiosApi.put(`/contacts/${idContact}.json`, newContact);
            navigate('/');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="row">
            <div className="col">
                <AddForm onSubmitFormToAddContact={createDish} />
            </div>
        </div>
    );
};

export default EditContact;