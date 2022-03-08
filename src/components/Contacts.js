import React, { useState, useEffect } from 'react';
import * as Values from '../constants/constants'
import { Typography} from '@mui/material';
import { Dialog, DialogActions, DialogContent, AppBar, Button, Fab, Toolbar, TextField, Pagination, Snackbar  } from '@mui/material';
import "../styles/design.css";
import { makeStyles } from '@mui/styles';
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

const GET_CONTACTS = Values.GET_CONTACTS;
const CREATE_CONTACT = Values.CREATE_CONTACT;
const defaultFormState = {
	name: '',
    job: '',
};
let loading = false;

function Contacts(props) {
    const classes = useStyles(props);
    const [contactsData, setContactsData] = useState([]);
    const [form, setForm] = useState({});
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
	const [isFormValid, setIsFormValid] = useState(false);
    const [openMessage, setOpenMessage] = React.useState(false);
    const [message, setMessage] = React.useState({
        open: false,
        text : '',
	});

    useEffect(() => {      
        setPage(1);
        setForm(defaultFormState);
        getContacts();
      }, []);
    
    function getContacts() {

        fetch(GET_CONTACTS+'?page='+page, {
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

    function createContact(data) {

        fetch(CREATE_CONTACT, {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .then(response => {
                setMessage({text: 'User created at '+response.createdAt.slice(0,10)+', with id: '+ response.id, 
                    open: true
                });
                getContacts();
                handleClose();
            },
                (error) => {
                    setMessage({text: 'Something went wrong', 
                    open: true,
                    });
                }
            );
    }

    const handleOpen = () => {
		// Modal of edit contact Enabled
		setOpen(true);
	};

	const handleClose = () => {
		// Modal of edit contact Disabled
		setOpen(false);
	};

    function handleChangePage(e) {

        setPage(e.target.textContent);
        getContacts();
    }

    function handleChange(e, field) {
        let { value } = e.target;

        var formAux = form;
        formAux[field] = value;
        setForm(formAux);
    }

    function handleCloseMessage(){
        setMessage({
            open: false,
            text: ''
        });
    }

    useEffect(() => {      
        getContacts();
      }, [page]);

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
        createContact(form);
	}

    return (
        <div>
            <h1 className="title">
                Contacts
            </h1>
            <div className="section2">
            {contactsData.data && contactsData.data.length > 0 ? (
                    <>
                        {contactsData.data && contactsData.data.map((contact, index) => (
                            <>
                                <div key={contact.id} className='contactdiv'>
                                    <div className="card">
                                        <img src={contact.avatar} />
                                        <Typography className="titleName">{contact.first_name}</Typography>
                                        <Typography>{contact.email}</Typography>

                                            <a href={'/details/'+contact.id}><Typography>View</Typography></a>
                                            {/* <Typography>Edit</Typography> */}
                                    </div>
                                </div>
                            </>
                        ))}
                    </>
                )
                    : null
                }
            </div>


            {/* ------------------- Modal ------------------- */}
            {contactsData.data ?
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
                                    {'Crear Contacto'}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Formsy
                            onValidSubmit={handleSubmit}
                            onChange={validateForm}
                            onValid={enableButton}
                            onInvalid={disableButton}
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
                            onClick={handleOpen}
                        >
                            +
                        </Fab>
                    </div>

                    <div className="section">
                        <Pagination count={contactsData.total_pages} variant="outlined" page={page} onChange={handleChangePage} />
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