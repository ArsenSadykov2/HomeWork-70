import {ChangeEvent, FormEvent, useState} from "react";
import {NavLink} from "react-router-dom";
import {User} from "../../types";

interface Props {
    onSubmitFormToAddContact: (newContact: User) => void;
}

const QuoteForm: React.FC<Props> = ({onSubmitFormToAddContact}) => {
    const [form, setForm] = useState<User>({
        name: '',
        email: '',
        phone: '',
        image: '',
    });
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setForm(prevState => ({...prevState, [name]: value}));
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmitFormToAddContact({...form});
    }
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label htmlFor="name">Name</label>
                    <input
                        required
                        className="form-control"
                        type="text"
                        value={form.name}
                        name="name"
                        onChange={inputChangeHandler}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="phone">Phone</label>
                    <input
                        required
                        className="form-control"
                        type="text"
                        value={form.phone}
                        name="phone"
                        onChange={inputChangeHandler}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        required
                        className="form-control"
                        type="text"
                        value={form.email}
                        name="email"
                        onChange={inputChangeHandler}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="image">Photo</label>
                    <input
                        required
                        className="form-control"
                        type="text"
                        value={form.image}
                        name="image"
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className="mb-3">
                    <button
                        className="btn btn-primary me-5"
                        type="submit"
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        <NavLink to='/' className="navbar-brand">Back To Contacts</NavLink>
                    </button>
                </div>
            </form>

        </div>
    );
};

export default QuoteForm;
