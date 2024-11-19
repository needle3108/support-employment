import {AppBar, Box, Button, createTheme, IconButton, ThemeProvider, Toolbar, Typography} from "@mui/material";
import ModalButtons from "./ModalButtons";
import LoginIcon from '@mui/icons-material/Login';
import {useLocation, useNavigate} from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(96,58,120)',
        }
    }
});

export default function Navbar(){
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate("/");
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{margin: 1}}>
                <AppBar position="static" sx={{
                    borderRadius: '5px',
                    background: 'linear-gradient(90deg, rgba(96,58,120,1) 0%, rgba(210,210,210,1) 100%, rgba(0,212,255,1) 100%)',
                }}>
                    <Toolbar sx={{justifyContent: 'space-between'}}>
                        <IconButton
                            onClick={() => handleClick()}
                            aria-label="Strona główna"
                            sx={{
                                color: "white",
                                "&:hover": { bgcolor: "primary.dark"}
                            }}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Lucida Handwriting"}} fontStyle="inherit">
                                HireMe
                            </Typography>
                        </IconButton>
                        {location.pathname === '/' &&
                            <Box sx={{display: 'flex'}}>
                                <ModalButtons />
                                <Button href="login" color="inherit">
                                    Zaloguj się
                                    <LoginIcon sx={{ml: '8px'}}/>
                                </Button>
                            </Box>}
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
}