import {
    AppBar,
    Avatar,
    Box,
    createTheme,
    IconButton,
    Menu, MenuItem,
    ThemeProvider,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {getAuthToken, setAuthHeader} from "../services/BackendService";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";

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

const settings = ['Mój profil', 'Wiadomości', 'Wyloguj się'];

export default function UserNavbar(){
    const[file, setFile] = useState("");
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    useEffect(() => {
        try{
            fetch("http://localhost:8080/user/getImage", {
                method: "GET",
                headers: {'Authorization': `Bearer ${getAuthToken()}`},
            }).then(response => {
                if (response.status == 200) {
                    return response.json();
                }
                else {
                    return null;
                }
            }).then(data => {
                if (data!==null){
                    setFile(data["photoFilePath"]);
                }
            })
        }
        catch (error) {
            console.error("Błąd pobierania danych: ", error);
        }
    }, []);

    const handleClick = () => {
        navigate("/profile")
    }

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElUser(null);
    };

    const handleSetting = (setting: string) => {
        if (setting === settings[0]){
            navigate("/profile");
        }

        else if (setting === settings[1]){
            navigate("/userMessages");
        }

        else if (setting === settings[2]){
            setAuthHeader(null);
            navigate("/");
        }
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
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Opcje">
                                    <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                                        <Avatar src={"data:image/png;base64,"+file}></Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={() => handleSetting(setting)}>
                                            <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>
        )
}