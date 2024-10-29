import {AppBar, Box, Button, createTheme, IconButton, ThemeProvider, Toolbar, Typography} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
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

export default function NavbarSignUp(){
    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    }

    return (
        <ThemeProvider theme={theme}>
            <Box>
                <AppBar position="static" sx={style}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Lucida Handwriting"}} fontStyle="inherit">
                            HireMe
                        </Typography>
                        <IconButton onClick={home}>
                            <HomeIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
}