import {Avatar, Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getAuthToken} from "../../services/BackendService";
import HRNavbar from "../../components/HRNavbar";

const cardStyle = {
    position: 'absolute',
    top: '12%',
    left: '5%',
    right: '52%',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
}

const cardStyle4 = {
    position: 'absolute',
    top: '80%',
    left: '5%',
    right: '52%',
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

const textFieldStyle = {
    left: '10%',
    mr: '20px',
    mt: '20px',
    width: '300px'
}

const buttonStyle = {
    margin: '0',
    bgcolor: 'rgb(96,58,120)',
    color: 'white',
    borderRadius: '5px',
    top: '30%',
}

const cardStyle2 = {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    width: '200px',
    height: '280px',
    mr: '13px',
    mb: '13px',
    textAlign: 'center',
    flexShrink: '0',
}

const cardStyle3 = {
    position: 'absolute',
    top: '12%',
    left: '52%',
    right: '5%',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
}

const boxStyle = {
    position: 'absolute',
    left: '52%',
    right: '5%',
    top: '35%',
    display: 'flex',
    flexWrap: 'wrap'
}

export default function Candidate(){
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[phoneNumber, setPhoneNumber] = useState("");
    const[description, setDescription] = useState("");
    const[profession, setProfession] = useState("");
    const[file, setFile] = useState("");
    const[opinions, setOpinions] = useState([]);
    const[opinionContext, setOpinionContext] = useState("");
    const[message, setMessage] = useState("");

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

            fetch("http://localhost:8080/userHR/getOpinions", {
                method: "POST",
                headers: {'Authorization': `Bearer ${getAuthToken()}`},
                body: formData
            }).then(res => {
                if (res.status == 200) {
                    return res.json();
                }
                else {
                    return null;
                }
            }).then(d => {
                if (d !== null){
                    setOpinions(d);
                }
            })
        }
        catch (error) {
            console.error("Błąd pobierania danych: ", error);
        }
    }, []);

    const handleClick = async () => {
        try{
            const formData = new FormData();

            formData.append('idCandidate', location.state.id);

            await fetch("http://localhost:8080/userHR/addFavourite", {
                method: "POST",
                headers: {'Authorization': `Bearer ${getAuthToken()}`},
                body: formData
            })
        }
        catch (error) {
            console.error("Błąd dodawania kadydata do ulubionych: ", error);
        }
    }

    const handleSubmit = async () => {
        try{
            const formData = new FormData();
            formData.append('idCandidate', location.state.id);

            if (opinionContext.length === 0){
                console.error("Opinia nie może być pusta");
                return null;
            }
            else{
                formData.append('opinion', opinionContext);
            }

            await fetch("http://localhost:8080/userHR/addOpinion", {
                method: "POST",
                headers: {'Authorization': `Bearer ${getAuthToken()}`},
                body: formData
            }).then(response => {
                if (response.status == 200) {
                    console.log("Komentarz został dodany")
                }
                else{
                    console.error("Błąd dodawania komentarza")
                }
            })

        }
        catch (error) {
            console.error("Błąd dodawania komentarza: ", error);
        }
    }

    const handleSendMessage = async () => {
        try{
            const formData = new FormData();
            formData.append('idCandidate', location.state.id);

            if (message.length === 0){
                console.error("Wiadomość nie może być pusta");
                return null;
            }
            else{
                formData.append('message', message);
            }

            await fetch("http://localhost:8080/userHR/sendMessage", {
                method: "POST",
                headers: {'Authorization': `Bearer ${getAuthToken()}`},
                body: formData
            }).then(response => {
                if (response.status == 200) {
                    console.log("Wiadomość została wysłana")
                }
                else{
                    console.error("Błąd wysyłania wiadomości")
                }
            })
        }
        catch (error) {
            console.error("Błąd wysyłania wiadomości: ", error);
        }
    }

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
                    <Button onClick={() => handleClick()} sx={buttonStyle}>Dodaj do ulubionych</Button>
                </Card>
                <Card sx={cardStyle}>
                    <TextField
                        label="Wiadomość"
                        onChange={e => setMessage(e.target.value)}
                        variant="standard"
                        color="secondary"
                        type="text"
                        sx={textFieldStyle}
                        value={message}
                        helperText="Napisz wiadomość do kandydata"
                        multiline
                        maxRows={8}
                    />
                </Card>
                <Button onClick={() => handleSendMessage()} sx={buttonStyle}>Wyślij wiadomość</Button>
            </Box>
            <Box>
                <Card sx={cardStyle3}>
                    <CardContent>
                        <Typography variant="h4" sx={typographyStyle}>Dodaj opinie</Typography>
                        <TextField
                            label="Opinia"
                            onChange={e => setOpinionContext(e.target.value)}
                            variant="standard"
                            color="secondary"
                            type="text"
                            sx={textFieldStyle}
                            value={opinionContext}
                            helperText="Napisz opinię na temat współpracy z pracownikiem"
                            multiline
                            maxRows={8}
                        />
                        <Button onClick={() => handleSubmit()} sx={buttonStyle}>Dodaj opinię</Button>
                    </CardContent>
                </Card>
            </Box>
            <Box sx={boxStyle}>
                {
                    opinions.map(opinion => (
                        <Card key={opinion["id"]} sx={cardStyle2}>
                            <Avatar src={"data:image/png;base64,"+opinion["image"]}/>
                            <Typography variant="h6" sx={typographyStyle}>{opinion["name"]} {opinion["lastName"]} | {opinion["companyName"]}</Typography>
                            <Typography variant="subtitle2" sx={typographyStyle}>{opinion["dateTime"]}</Typography>
                            <Typography variant="subtitle1" sx={typographyStyle}>{opinion["opinion"]}</Typography>
                        </Card>
                    ))
                }
            </Box>
        </Box>
    )
}