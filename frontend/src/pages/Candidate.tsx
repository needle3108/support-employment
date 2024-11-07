import {Avatar, Box, Card, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getAuthToken} from "../services/BackendService";
import HRNavbar from "../components/HRNavbar";

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

export default function Candidate(){
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[phoneNumber, setPhoneNumber] = useState("");
    const[description, setDescription] = useState("");
    const[profession, setProfession] = useState("");
    const[file, setFile] = useState("");

    const location = useLocation();

    useEffect(() => {
        try{
            const formData = new FormData();

            formData.append('id', location.state.id);

            fetch("http://localhost:8080/userHR/getCandidate", {
                method: "POST",
                headers: {'Authorization': `Bearer ${getAuthToken()}`},
                body: formData
            }).then(response => {
                if (response.status == 200) {
                    return response.json();
                }
                else {
                    return null;
                }
            }).then(data => {
                if (data !== null){
                    setFirstName(data["firstName"]);
                    setLastName(data["lastName"]);
                    setEmail(data["email"]);
                    setPhoneNumber(data["phoneNumber"]);
                    setDescription(data["description"]);
                    setProfession(data["profession"]);
                    setFile(data["photoFilePath"])
                }
            })
        }
        catch (error) {
            console.error("Błąd pobierania danych: ", error);
        }
    }, []);

    return (
        <Box>
            <HRNavbar />
            <Box>
                <Card sx={cardStyle}>
                    <Avatar src={"data:image/png;base64,"+file} sx={avatarStyle}></Avatar>
                    <label>Imię: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{firstName}</Typography>
                    <label>Nazwisko: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{lastName}</Typography>
                    <label>Email: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{email}</Typography>
                    <label>Numer telefonu: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{phoneNumber}</Typography>
                    <label>Opis: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{description}</Typography>
                    <label>Profesja: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{profession}</Typography>
                </Card>
            </Box>
        </Box>
    )
}