import React, { useState, useEffect } from 'react';
import * as Values from '../constants/constants'
import { Typography } from '@mui/material';
import "../styles/design.css";

const GET_CONTACTS = Values.GET_CONTACTS;

function Contacts() {

    const [contactsData, setContactsData] = useState([]);

    useEffect(() => {      
        getContacts();
      }, []);
    
    function getContacts() {

        fetch(GET_CONTACTS, {
            method: 'GET',})
            .then(response => response.json())
            .then(response => {
                setContactsData(response);
            },
                (error) => {
                    console.log(error);
                }
            );
    }

    return (
        <div className="App">
            <h1 className="title">
                Contacts
            </h1>
            <div className="section">
                {contactsData.data && contactsData.data.length > 0 ? (
                    <>
                        {contactsData.data && contactsData.data.map((contact, index) => (
                            <>
                                <div key={contact.id} >
                                    <p>
                                        <Typography className="titleName">{contact.first_name}</Typography>
                                    </p>
                                    <p>{contact.email}</p>
                                    <img key={contact.avatar} src={contact.avatar} />

                                    <div>
                                        <a href={'/details/'+contact.id}><Typography>View</Typography></a>
                                        {/* <Typography>View</Typography> */}
                                        <Typography>Edit</Typography>
                                    </div>
                                </div>
                                {/* <Typography>View</Typography> */}
                            </>
                        ))}
                    </>
                )
                    : null
                }
            </div>
        </div>
    )
}
export default Contacts;