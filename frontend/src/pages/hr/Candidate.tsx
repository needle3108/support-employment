import {Alert, Avatar, Box, Card, IconButton, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getAuthToken} from "../../services/BackendService";
import HRNavbar from "../../components/HRNavbar";
import {grey} from "@mui/material/colors";
import {format} from "date-fns";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";

const avatarStyle = {
    width: '200px',
    height: '200px',
    mt: '10px',
    margin: 'auto',
}

const typographyStyle = {
    mb: '5px'
}

const textFieldStyle = {
    left: '10%',
    width: '100%',
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

    const[opinionSend, setOpinionSend] = useState("");

    const[serverMessage, setServerMessage] = useState<null | string>(null);
    const[error, setError] = useState<null | string>(null);

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

    useEffect(() => {
        try{
            const formData = new FormData();

            formData.append('id', location.state.id);

            fetch("http://localhost:8080/userHR/getOpinions", {
                method: "POST",
                headers: {'Authorization': `Bearer ${getAuthToken()}`},
                body: formData
            }).then(res => {
                if (res.status === 200) {
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
    }, [opinionSend]);

    const handleClick = () => {
        try{
            const formData = new FormData();

            formData.append('idCandidate', location.state.id);

            fetch("http://localhost:8080/userHR/addFavourite", {
                method: "POST",
                headers: {'Authorization': `Bearer ${getAuthToken()}`},
                body: formData
            }).then(async response => {
                if (response.status === 200){
                    return response.json();
                }
                const msg = await response.json();
                throw new Error(msg["message"]);
            }).then(data => {
                if (data !== null){
                    setServerMessage(data['message']);
                }
            }).catch((error) => {
                setError((error as Error).message);
                console.error(error);
            })
        }
        catch (error) {
            setError((error as Error).message);
            console.error((error as Error).message);
        }
    }

    const handleSubmit = async () => {
        try{
            const formData = new FormData();
            formData.append('idCandidate', location.state.id);

            if (opinionContext.length === 0){
               throw new Error("Opinia nie może być pusta!");
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
                    console.log("Komentarz został dodany");
                    setOpinionSend(opinionContext);
                    setOpinionContext("");
                    setError(null);
                }
                else{
                    console.error("Błąd dodawania komentarza")
                }
            })

        }
        catch (error) {
            setError((error as Error).message);
            console.error((error as Error).message);
        }
    }

    const handleSendMessage = async () => {
        try{
            const formData = new FormData();
            formData.append('idCandidate', location.state.id);

            if (message.length === 0){
                throw new Error("Wiadomość nie może być pusta!");
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
                    console.log("Wiadomość została wysłana");
                    setMessage("");
                    setError(null);
                }
                else{
                    console.error("Błąd wysyłania wiadomości")
                }
            })
        }
        catch (error) {
            setError((error as Error).message);
            console.error((error as Error).message);
        }
    }

    const handleKeyDownMessage = (e: any) => {
        if (e.code === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    }

    const handleKeyDownOpinion = (e: any) => {
        if (e.code === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    }

    return (
        <Box sx={{bgcolor: grey[200], height: '100%', width: '100%', left: 0, top: 0, overflow: 'auto', position: 'fixed'}}>
            <HRNavbar />
            {error &&
                <Box sx={{display: 'flex', justifyContent: "center", textAlign: "center", margin: 2}}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            }
            {serverMessage &&
                <Box sx={{display: 'flex', justifyContent: "center", textAlign: "center", margin: 2}}>
                    <Alert severity="success">{serverMessage}</Alert>
                </Box>
            }
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
                    <IconButton
                        color="primary"
                        onClick={() => handleClick()}
                        aria-label="dodaj do ulubionych"
                        sx={{
                            bgcolor: 'rgb(96,58,120)',
                            color: "white",
                            '&:hover': { bgcolor: "rgb(207, 159, 255)"},
                            right: '1%',
                            margin: 1
                        }}
                    >
                        <FavoriteIcon />
                    </IconButton>
                </Card>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3}}>
                <Card sx={{
                    position: 'relative',
                    padding: 1,
                    width: '500px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    overflow: 'hidden',
                    '&:hover': { background: 'radial-gradient(circle, rgba(211,185,227,1) 0%, rgba(210,210,210,1) 100%, rgba(0,212,255,1) 100%)'},
                    margin: 1,
                    display: 'flex'
                }}>
                    <Box sx={{width: "60%"}}>
                        <TextField
                            label="Wiadomość"
                            onChange={e => setMessage(e.target.value)}
                            variant="standard"
                            color="secondary"
                            type="text"
                            sx={textFieldStyle}
                            value={message}
                            helperText="Napisz wiadomość do kandydata"
                            onKeyDown={handleKeyDownMessage}
                            multiline
                            maxRows={8}
                        />
                    </Box>
                    <Box sx={{ml: 10}}>
                        <IconButton
                            color="primary"
                            onClick={handleSendMessage}
                            aria-label="wyślij wiadomość"
                            sx={{
                                bgcolor: 'rgb(96,58,120)',
                                color: "white",
                                '&:hover': { bgcolor: "rgb(207, 159, 255)"},
                                transform: 'translate(50%, 50%)'
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Card>
                <Card sx={{
                    position: 'relative',
                    padding: 1,
                    width: '500px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    overflow: 'hidden',
                    '&:hover': { background: 'radial-gradient(circle, rgba(211,185,227,1) 0%, rgba(210,210,210,1) 100%, rgba(0,212,255,1) 100%)'},
                    margin: 1,
                    display: 'flex'
                }}>
                    <Box sx={{width: "60%"}}>
                        <TextField
                            label="Opinia"
                            onChange={e => setOpinionContext(e.target.value)}
                            variant="standard"
                            color="secondary"
                            type="text"
                            sx={textFieldStyle}
                            value={opinionContext}
                            onKeyDown={handleKeyDownOpinion}
                            helperText="Napisz opinię na temat współpracy z pracownikiem"
                            multiline
                            maxRows={8}
                        />
                    </Box>
                    <Box sx={{ml: 10}}>
                        <IconButton
                            color="primary"
                            onClick={handleSubmit}
                            aria-label="wyślij wiadomość"
                            sx={{
                                bgcolor: 'rgb(96,58,120)',
                                color: "white",
                                '&:hover': { bgcolor: "rgb(207, 159, 255)"},
                                transform: 'translate(50%, 50%)'
                            }}
                        >
                            <SendIcon />
                        </IconButton>
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