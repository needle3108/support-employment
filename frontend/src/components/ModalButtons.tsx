import {useState} from "react";
import {Box, Button, Modal, Typography} from "@mui/material";

export default function ModalButtons(){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Button onClick={handleOpen}>Zarejestruj się</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Rejesracja
                    </Typography>
                    <Button color="primary" href="/signup">Szukam pracy</Button>
                    <Button color="primary" href="/signupHR">Szukam pracowników</Button>
                </Box>
            </Modal>
        </Box>
    )
}