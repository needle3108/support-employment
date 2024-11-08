import {AppBar, Box, createTheme, IconButton, ThemeProvider, Toolbar, Typography} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import {setAuthHeader} from "../services/BackendService";
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

export default function UserNavbar(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/profile")
    }

    const logout = () => {
        setAuthHeader(null);
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
                            <MessageIcon sx={{ml: '8px'}}/>
                            <NotificationsIcon sx={{ml: '8px'}}/>
                            <IconButton onClick={logout}>
                                <LogoutIcon sx={{ml: '8px'}}/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>
        )
}