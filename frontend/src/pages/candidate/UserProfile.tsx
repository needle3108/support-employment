import {Avatar, Box, Card, Typography} from "@mui/material";
import UserNavbar from "../../components/UserNavbar";
import React, {useEffect, useState} from "react";
import {getAuthToken} from "../../services/BackendService";
import {grey} from "@mui/material/colors";
import { format } from 'date-fns'

const avatarStyle = {
    width: '200px',
    height: '200px',
    mt: '10px',
    margin: 'auto',
}

const typographyStyle = {
    mb: '5px'
}

export default function UserProfile() {
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[phoneNumber, setPhoneNumber] = useState("");
    const[description, setDescription] = useState("");
    const[profession, setProfession] = useState("");
    const[file, setFile] = useState("");
    const[opinions, setOpinions] = useState([]);

    useEffect(() => {
        try{
            fetch("http://localhost:8080/user/profile", {
                method: "GET",
                headers: {'Authorization': `Bearer ${getAuthToken()}`},
            }).then(response => {
                if(response.status === 200){
                    return response.json();
                }
                else{
                    return null;
                }
            }).then(data => {
                if (data !== null) {
                    setFirstName(data["firstName"]);
                    setLastName(data["lastName"]);
                    setEmail(data["email"]);
                    setPhoneNumber(data["phoneNumber"]);
                    setDescription(data["description"]);
                    setProfession(data["profession"]);
                    setFile(data["photoFilePath"])
                }
            })

            fetch("http://localhost:8080/user/getMyOpinions", {
                method: "GET",
                headers: {'Authorization': `Bearer ${getAuthToken()}`},
            }).then(response => {
                if(response.status === 200){
                    return response.json();
                }
                else{
                    return null;
                }
            }).then(data => {
                if (data !== null) {
                    setOpinions(data);
                }
            })

        } catch (error) {
            console.error("Błąd pobierania danych: ", error);
        }
    }, [])

    return (
        <Box sx={{bgcolor: grey[200], height: '100%', width: '100%', left: 0, top: 0, overflow: 'auto', position: 'fixed'}}>
            <UserNavbar />
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4}}>
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
                        }}>
                            <Typography variant="h6" sx={typographyStyle}>Imię: {firstName}</Typography>
                            <Typography variant="h6" sx={typographyStyle}>Nazwisko: {lastName}</Typography>
                            <Typography variant="h6" sx={typographyStyle}>Email: {email}</Typography>
                            <Typography variant="h6" sx={typographyStyle}>Numer kontaktowy: {phoneNumber}</Typography>
                            <Typography variant="h6" sx={typographyStyle}>Profesja: {profession}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{margin: 1, mt: 2}}>
                        <Typography variant="body1" sx={{wordWrap: 'normal'}}>{description}</Typography>
                    </Box>
                </Card>
            </Box>
            <Box sx={{
                mt: 8,
            }}>
                {
                    opinions.map(opinion => (
                        <Card key={opinion["id"]} sx={{
                            position: 'relative',
                            ml: '10%',
                            mr: '10%',
                            mb: 2,
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                            '&:hover': { background: 'radial-gradient(circle, rgba(211,185,227,1) 0%, rgba(210,210,210,1) 100%, rgba(0,212,255,1) 100%)'},
                        }}>
                            <Box sx={{display: 'flex'}}>
                                <Avatar src={"data:image/png;base64,"+opinion["image"]} sx={{
                                   margin: 1,
                                    height: '35px',
                                    width: '35px'
                                }}/>
                                <Typography variant="h6" sx={{
                                    mt: 1.5
                                }}>
                                    {opinion["name"]} {opinion["lastName"]} | {opinion["companyName"]}
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{
                                ml: 3,
                                mt: 0.5,
                                mb: 2
                            }}>
                                {opinion["opinion"]}
                            </Typography>
                            <Typography variant="caption" sx={{
                                ml: 1,
                            }}>{format(opinion["dateTime"],"d.MM.yyyy H:mm")}</Typography>
                        </Card>
                    ))
                }
            </Box>
        </Box>
    )
}