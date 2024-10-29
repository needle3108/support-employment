import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Box, Button, Card, TextField} from "@mui/material";
import NavbarSignUp from "../components/NavbarSignUp";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const cardStyle = {
    position: 'absolute',
    top: '14%',
    left: '30%',
    right: '30%',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
}

const textFieldStyle = {
    left: '10%',
    mr: '20px',
    mt: '20px',
    width: '300px'
}

const buttonStyle = {
    margin: 'auto',
    bgcolor: 'rgb(96,58,120)',
    color: 'white',
    borderRadius: '5px',
    top: '30%',
}

const divStyle = {
    height: '60px',
    position: 'relative',
    textAlign: 'center',
}

const avatarStyle = {
    width: '230px',
    height: '230px',
    margin: 'auto',
    mt: '10px'
}

export default function SignUpHR(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [photoFilePath, setPhotoFilePath] = useState("");

    const [file, setFile] = useState("");

    const navigate = useNavigate();

    const handleUploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        try{
            event.preventDefault();
            fetch("http://localhost:8080/auth/signupHR", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name,
                    lastName: lastName,
                    city: city,
                    companyName: companyName,
                    photoFilePath: photoFilePath
                })
            }).then(response => {
                if (response.status == 200) {
                    return response.json();
                }
                else {
                    return null;
                }
            }).then(data => {
                if (data !== null) {
                    setTimeout(navigate, 0, "/login", { replace: true });
                }
                else{
                    setTimeout(navigate, 0, "/signupHR", { replace: true });
                }
            })
        } catch (error) {
            console.error("Błąd rejestracji: ", error);
        }
    }

    return (
        <Box>
            <NavbarSignUp />
            <Card sx={cardStyle}>
                <form autoComplete="off" onSubmit={handleRegister}>
                    { file && <Avatar sx={avatarStyle} src={file} alt={"../../public/logo512.png"}/>}
                    <TextField
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        variant="standard"
                        color="secondary"
                        type="email"
                        sx={textFieldStyle}
                        value={email}
                    />
                    <TextField
                        label="Hasło"
                        onChange={e => setPassword(e.target.value)}
                        required
                        variant="standard"
                        color="secondary"
                        type="password"
                        sx={textFieldStyle}
                        value={password}
                    />
                    <TextField
                        label="Imię"
                        onChange={e => setName(e.target.value)}
                        required
                        variant="standard"
                        color="secondary"
                        type="text"
                        sx={textFieldStyle}
                        value={name}
                    />
                    <TextField
                        label="Nazwisko"
                        onChange={e => setLastName(e.target.value)}
                        required
                        variant="standard"
                        color="secondary"
                        type="text"
                        sx={textFieldStyle}
                        value={lastName}
                    />
                    <TextField
                        label="Miasto"
                        onChange={e => setCity(e.target.value)}
                        required
                        variant="standard"
                        color="secondary"
                        type="text"
                        sx={textFieldStyle}
                        value={city}
                    />
                    <TextField
                        label="Nazwa firmy"
                        onChange={e => setCompanyName(e.target.value)}
                        required
                        variant="standard"
                        color="secondary"
                        type="text"
                        sx={textFieldStyle}
                        value={companyName}
                    />
                    <TextField
                        label="Zdjęcie"
                        onChange={e => setPhotoFilePath(e.target.value)}
                        variant="standard"
                        color="secondary"
                        type="text"
                        sx={textFieldStyle}
                        placeholder="Uploading images feature is coming!"
                        value={photoFilePath}
                    />
                    <Box sx={divStyle} component="div">
                        <Button component="label" sx={buttonStyle}>
                            <AddAPhotoIcon />
                            <input
                                type="file"
                                hidden
                                onChange={handleUploadPhoto}
                            />
                        </Button>
                    </Box>
                    <Box sx={divStyle} component="div">
                        <Button type="submit" sx={buttonStyle}>Utwórz konto</Button>
                    </Box>
                </form>
            </Card>
        </Box>
    )
}