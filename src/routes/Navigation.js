import {Route, Routes } from 'react-router-dom';
import Contacts from '../components/Contacts';
import ContactDetails from '../components/ContactDetails';
// import publicTable from '../pages/publicTable'

function Navigation () {
    return(
        <>
            <Routes >
                <Route path="/" element={<Contacts />} />
                <Route path="/details/:id" element={<ContactDetails />} />
                {/* <Route exact path="/publicTable" component={publicTable} /> */}
            </Routes>
        </>
    );
}
export default Navigation;