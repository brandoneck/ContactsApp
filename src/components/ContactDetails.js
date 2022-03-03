import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../styles/design.css";
import * as Values from '../constants/constants'
import { Typography } from '@mui/material';

const GET_SINGLE_CONTACT = Values.GET_SINGLE_CONTACT;

function Contacts() {
    let { id } = useParams();
    const [contactDetails, setContactDetails] = useState([]);

    useEffect(() => {
        console.log(id);
        getDetails();
    }, [id]);

    function getDetails() {

        fetch(GET_SINGLE_CONTACT+id, {
            method: 'GET',})
            .then(response => response.json())
            .then(response => {
                setContactDetails(response);
                console.log(contactDetails);
            },
                (error) => {
                    console.log(error);
                }
            );
    }

    return (
        <div className="App">
            <h1 className="title">
                Contact Details
            </h1>

            {contactDetails && contactDetails.data ?
            <div className="details">
                <img src={contactDetails.data.avatar} />
                <p>
                    <Typography className="titleName">{contactDetails.data.first_name+' '+contactDetails.data.last_name}</Typography>
                    <Typography>{contactDetails.data.email}</Typography>
                    <Typography>{contactDetails.support.text}</Typography>
                    <a href={contactDetails.support.url}><Typography>Support</Typography></a>

                </p>
            </div>
            :null    
            }
            {/* contactDetails.data.avatar */}
        </div>
    )
}
export default Contacts;