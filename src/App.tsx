import './App.css'
import {Routes, Route} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import NewContact from "./containers/NewContact/NewContact.tsx";

const App = () => (
    <>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/new-contact" element={<NewContact/>}></Route>
            <Route path="*" element={(<h1>Not Page Found</h1>)}/>
        </Routes>
    </>
);

export default App
