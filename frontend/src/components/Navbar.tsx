import {AppBar, Box, Button, createTheme, ThemeProvider, Toolbar, Typography} from "@mui/material";
import ModalButtons from "./ModalButtons";

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
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <AppBar position="static" sx={style}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "Lucida Handwriting"}} fontStyle="inherit">
                            HireMe
                        </Typography>
                        <ModalButtons />
                        <Button href="login" color="inherit">Zaloguj się</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
}