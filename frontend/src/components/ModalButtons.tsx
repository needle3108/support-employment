import {useState} from "react";
import {Box, Button, Modal} from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const style= {
    position: 'absolute',
    top: '30%',
    left: '50%',
    bgcolor: 'white',
    border: '1px solid rgb(96,58,120)',
    boxShadow: 24,
    p: 4,
    transform: 'translate(-50%, -50%)',
    borderRadius: '5px',
}

const buttonStyle = {
    margin: '15px',
    bgcolor: 'rgb(96,58,120)',
    color: 'white',
    borderRadius: '5px',
}

export default function ModalButtons(){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Button onClick={handleOpen} color="inherit">
                Zarejestruj się
                <AppRegistrationIcon sx={{ml: '10px'}}/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Button color="primary" sx={buttonStyle} href="/signup">Szukam pracy</Button>
                    <Button color="primary" sx={buttonStyle} href="/signupHR">Szukam pracowników</Button>
                </Box>
            </Modal>
        </Box>
    )
}