import {NavLink} from "react-router-dom";

const Toolbar= () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <NavLink to='/' className="navbar-brand">Contacts</NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item btn-success">
                            <NavLink to='/new-contact' className="nav-link">Add New Dish</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Toolbar;