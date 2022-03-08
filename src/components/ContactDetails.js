import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../styles/design.css";
import * as Values from '../constants/constants'
import { Typography, Dialog, DialogActions, DialogContent, AppBar, Button, Fab, Toolbar, TextField, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import Formsy from 'formsy-react';


const useStyles = makeStyles({
	editContact: {
		position: 'absolute',
		right: 12,
		bottom: 12,
		zIndex: 99
	},
    titleDialog: {
        fontFamily: "Poppins",
        fontSize: "20px",
        textAlign: 'center'
    },
});

const GET_SINGLE_CONTACT = Values.GET_SINGLE_CONTACT;
const UPDATE_CONTACT = Values.UPDATE_CONTACT;

function Contacts(props) {
    let { id } = useParams();
    const classes = useStyles(props);
    const [contactDetails, setContactDetails] = useState([]);
    const [form, setForm] = useState({});
	const [isFormValid, setIsFormValid] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState({
        open: false,
        text : '',
	});
    
    // useEffect(() => {
    //     setForm(defaultFormState);
    // }, []);

    useEffect(() => {
        getDetails();
    }, [id]);



    useEffect(() => {

        if (contactDetails.data){
            const formContacts = {
                name: contactDetails.data.first_name +' '+ contactDetails.data.last_name,
                job: '',
            };
            setForm(formContacts);
        }
    }, [contactDetails]);

    function getDetails() {

        fetch(GET_SINGLE_CONTACT+id, {
            method: 'GET',})
            .then(response => response.json())
            .then(response => {
                setContactDetails(response);
            },
                (error) => {
                    console.log(error);
                }
            );
    }

    function updateContact(data) {

        fetch(UPDATE_CONTACT+id, {
            method: 'PUT',
            body: data,
        })
            .then(response => response.json())
            .then(response => {
                setMessage({text: 'User updated at '+response.updatedAt.slice(0,10), 
                    open: true
                });
                getDetails();
                handleClose();
            },
                (error) => {
                    setMessage({text: 'Something went wrong', 
                    open: true,
                    });
                }
            );
    }

    function handleChange(e, field) {

        // ------ Getting values from input
        let { value } = e.target;

        var formAux = form;
        formAux[field] = value;

        setForm(formAux);
    }


    const handleOpen = () => {
		// Modal of edit contact Enabled
		setOpen(true);
	};

	const handleClose = () => {
		// Modal of edit contact Disabled
		setOpen(false);

        const formContacts = {
            name: contactDetails.data.first_name +' '+ contactDetails.data.last_name,
            job: '',
        };

        setForm(formContacts);
	};

    function disableButton() {
        setIsFormValid(false);
    }

    function enableButton() {
        setIsFormValid(true);
    }

    function validateForm (values) {
        setForm({ values });
	}

    function handleSubmit(event) {
        updateContact(form);
	}

    function handleCloseMessage(){
        setMessage({
            open: false,
            text: ''
        });
    }

    return (
        <div className="full-height">
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


            {/* <Button >Open modal</Button> */}

    

            {/* ------------------- Modal ------------------- */}
            {contactDetails.data ?
                <>
                    <Dialog
                        classes={{
                            paper: 'm-24 rounded-12'
                        }}
                        open={open}
                        onClose={handleClose}
                        fullWidth
                        maxWidth="xs"
                    >
                        <AppBar position="static" elevation={1}>
                            <Toolbar className="flex w-full text-center items-center justify-center">
                                <Typography className={classes.titleDialog} color="inherit">
                                    {'Editar Contacto'}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Formsy
                            onValidSubmit={handleSubmit}
                            onChange={validateForm}
                            onValid={enableButton}
                            onInvalid={disableButton}
                            // ref={formRef}
                            className="flex flex-wrap w-full flex-row items-center justify-center pt-12 inline-block"
                        >
                            <DialogContent classes={{ root: 'pt-40 pl-24 pr-24' }}>

                                <TextField
                                    fullWidth
                                    style={{ marginBottom: '16px' }}
                                    type="text"
                                    id="outlined-basic"
                                    label="name"
                                    name="name"
                                    defaultValue={form.name}
                                    onChange={e => handleChange(e, "name")}
                                    validations={{
                                        minLength: 2
                                    }}
                                    validationErrors={{
                                        minLength: 'Min character length is 4'
                                    }}
                                    variant="outlined"
                                    required
                                />

                                <TextField
                                    fullWidth
                                    type="text"
                                    id="outlined-basic"
                                    label="job"
                                    name="job"
                                    defaultValue={form.job}
                                    onChange={e => handleChange(e, "job")}
                                    validations={{
                                        minLength: 2
                                    }}
                                    validationErrors={{
                                        minLength: 'Min character length is 4'
                                    }}
                                    variant="outlined"
                                    required
                                />

                            </DialogContent>
                            <DialogActions className="justify-between p-16">
                                <div className="flex w-full text-center items-center justify-center p-12">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={!isFormValid}
                                        autoFocus
                                    >
                                        Continuar
                                    </Button>

                                </div>
                            </DialogActions>
                        </Formsy>
                    </Dialog>


                    <div className="w-full items-right">
                        <Fab
                            variant="extended"
                            size="large"
                            color="primary"
                            aria-label="add"
                            color="primary"
                            aria-label="add"
                            style={{
                                position: 'absolute',
                                right: 50,
                                bottom: 50,
                                zIndex: 99
                            }}
                            // className={classes.editContact}
                            // class="fab"
                            onClick={handleOpen}
                        >
                            <EditIcon />
                        </Fab>
                    </div>
                </>
                :
                null}
            
            <Snackbar 
                open={message.open} 
                message={message.text} 
                autoHideDuration={5000} 
                onClose={handleCloseMessage}
            />
        </div>
    )
}
export default Contacts;