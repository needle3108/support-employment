import {Avatar, Box, Card, Typography} from "@mui/material";
import UserNavbar from "../components/UserNavbar";
import React from "react";
import {useLocation} from "react-router-dom";

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
    const location = useLocation();

    return (
        <Box>
            <UserNavbar />
            <Box>
                <Card sx={cardStyle}>
                    <Avatar src={"data:image/png;base64,"+location.state.photoFilePath} sx={avatarStyle}></Avatar>
                    <label>Imię: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{location.state.firstName}</Typography>
                    <label>Nazwisko: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{location.state.lastName}</Typography>
                    <label>Email: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{location.state.email}</Typography>
                    <label>Numer telefonu: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{location.state.phoneNumber}</Typography>
                    <label>Opis: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{location.state.description}</Typography>
                    <label>Profesja: </label>
                    <Typography variant="subtitle1" sx={typographyStyle}>{location.state.profession}</Typography>
                </Card>
            </Box>
        </Box>
    )
}