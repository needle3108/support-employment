import React, {useEffect, useState} from "react";
import {getAuthToken} from "../../services/BackendService";
import {Avatar, Box, Card, Typography} from "@mui/material";
import HRNavbar from "../../components/HRNavbar";

const cardStyle = {
    position: 'absolute',
    top: '12%',
    left: '30%',
    right: '30%',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
}

const avatarStyle = {
    width: '230px',
    height: '230px',
    margin: 'auto',
    mt: '10px'
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
        <Box>
            <HRNavbar />
            <Box>
                <Card sx={cardStyle}>
                    <Avatar src={"data:image/png;base64,"+file} sx={avatarStyle}></Avatar>
                    <label>Imię: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{name}</Typography>
                    <label>Nazwisko: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{lastName}</Typography>
                    <label>Email: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{email}</Typography>
                    <label>Miasto: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{city}</Typography>
                    <label>Nazwa firmy: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{companyName}</Typography>
                </Card>
            </Box>
        </Box>
    )
}