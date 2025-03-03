import AddForm from "../../components/AddForm/AddForm.tsx";
import {useState} from "react";
import {User} from "../../types";
import {useNavigate} from "react-router-dom";
import axiosApi from "../../axiosApi.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";

const NewContact = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const createContact = async (newContact: User) => {
        try{
            setLoading(true);
            await axiosApi.post('/contacts.json', newContact);
            navigate('/');
        } catch (error) {
            console.log(error);
        }finally {
            setLoading(false);
        }
    };
    return (
        <div className="container">
            {loading ? <Loader /> : <AddForm onSubmitFormToAddContact={createContact}/>}
        </div>
    );
};

export default NewContact;