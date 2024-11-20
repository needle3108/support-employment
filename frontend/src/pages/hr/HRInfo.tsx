import React, {useEffect, useState} from "react";
import {getAuthToken} from "../../services/BackendService";
import {Avatar, Box, Card, Typography} from "@mui/material";
import HRNavbar from "../../components/HRNavbar";
import {grey} from "@mui/material/colors";

const avatarStyle = {
    width: '230px',
    height: '230px',
    margin: 'auto',
}

const typographyStyle = {
    mb: '5px'
}

export default function HRInfo(){
    const[email, setEmail] = useState("");
    const[name, setName] = useState("");
    const[lastName, setLastName] = useState("");
    const[city, setCity] = useState("");
    const[companyName, setCompanyName] = useState("");
    const[file, setFile] = useState("");

    useEffect(() => {
        try{
            fetch("http://localhost:8080/userHR/getImage", {
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
                    setEmail(data["email"]);
                    setName(data["name"]);
                    setLastName(data["lastName"]);
                    setCity(data["city"]);
                    setCompanyName(data["companyName"]);
                    setFile(data["photoFilePath"]);
                }
            })
        } catch (error) {
            console.error("Błąd pobierania danych: ", error);
        }
    }, []);

    return(
        <Box sx={{bgcolor: grey[200], height: '100%', width: '100%', left: 0, top: 0, overflow: 'auto', position: 'fixed'}}>
            <HRNavbar />
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 10}}>
                <Card sx={{
                    position: 'relative',
                    padding: 1,
                    width: '750px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    overflow: 'hidden',
                    '&:hover': { background: 'radial-gradient(circle, rgba(211,185,227,1) 0%, rgba(210,210,210,1) 100%, rgba(0,212,255,1) 100%)'},
                }}>
                    <Box sx={{display: 'flex'}}>
                        <Box sx={{
                            width: '40%',
                            overflow: 'hidden',
                            padding: 1,
                            minWidth: '200px',
                        }}>
                            <Avatar src={"data:image/png;base64,"+file} sx={avatarStyle}></Avatar>
                        </Box>
                        <Box sx={{
                            width: '60%',
                            overflow: 'hidden',
                            padding: 2,
                            minWidth: '400px',
                            mt: 2
                        }}>
                            <Typography variant="subtitle1" sx={typographyStyle}>Imię: {name}</Typography>
                            <Typography variant="subtitle1" sx={typographyStyle}>Nazwisko: {lastName}</Typography>
                            <Typography variant="subtitle1" sx={typographyStyle}>Email: {email}</Typography>
                            <Typography variant="subtitle1" sx={typographyStyle}>Miasto: {city}</Typography>
                            <Typography variant="subtitle1" sx={typographyStyle}>Nazwa firmy: {companyName}</Typography>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Box>
    )
}