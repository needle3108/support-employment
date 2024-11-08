import {AppBar, Box, Button, createTheme, IconButton, ThemeProvider, Toolbar, Typography} from "@mui/material";
import ModalButtons from "./ModalButtons";
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(96,58,120)',
        }
    }
});

const style = {
    borderRadius: '5px',
    background: 'linear-gradient(90deg, rgba(96,58,120,1) 0%, rgba(210,210,210,1) 100%, rgba(0,212,255,1) 100%)',
}

export default function Navbar(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

    return (
        <ThemeProvider theme={theme}>
            <Box>
                <AppBar position="static" sx={style}>
                    <Toolbar>
                        <IconButton onClick={() => handleClick()}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Lucida Handwriting"}} fontStyle="inherit">
                                HireMe
                            </Typography>
                        </IconButton>
                        <ModalButtons />
                        <Button href="login" color="inherit">
                            Zaloguj się
                            <LoginIcon sx={{ml: '8px'}}/>
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
}