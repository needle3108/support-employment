import {Box, Button} from "@mui/material";
import ModalButtons from "../components/ModalButtons";

export default function MainPage(){
    return (
        <Box>
            <ModalButtons />
            <Button href="/login">Zaloguj się</Button>
        </Box>
    )
}