import React, {useState} from "react";
import {Avatar, Box, Button, Card, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import NavbarSignUp from "../components/NavbarSignUp";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const cardStyle = {
    position: 'absolute',
    top: '12%',
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
    margin: '0',
    bgcolor: 'rgb(96,58,120)',
    color: 'white',
    borderRadius: '5px',
    top: '30%',
}

const divStyle = {
    height: '80px',
    position: 'relative',
    textAlign: 'center',
}

const avatarStyle = {
    width: '230px',
    height: '230px',
    margin: 'auto',
    mt: '10px'
}

export default function SignUp(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [age, setAge] = useState(20);
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profession, setProfession] = useState("");
    const [file, setFile] = useState<File | undefined>();

    const [preview, setPreview] = useState("");

    const navigate = useNavigate();

    const handleUploadPhoto = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement & {
            files: FileList;
        }

        setFile(target.files[0]);
        setPreview(URL.createObjectURL(target.files[0]));
    }

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            const formData = new FormData();

            formData.append('email', email);
            formData.append('password', password);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('city', city);
            formData.append('age', age.toString());
            formData.append('description', description);
            formData.append('phoneNumber', phoneNumber);
            formData.append('profession', profession);

            if (typeof file === 'undefined'){
                formData.append('file', "");
            }
            else{
                formData.append('file', file);
            }

            fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                body: formData
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
                else {
                    setTimeout(navigate, 0, "/signup", { replace: true });
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
                            { file && <Avatar sx={avatarStyle} src={preview} alt={"../../public/logo512.png"}/>}
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
                                onChange={e => setFirstName(e.target.value)}
                                required
                                variant="standard"
                                color="secondary"
                                type="text"
                                sx={textFieldStyle}
                                value={firstName}
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
                                label="Wiek"
                                type="number"
                                onChange={e => setAge(parseInt(e.target.value, 10))}
                                required
                                variant="standard"
                                color="secondary"
                                sx={textFieldStyle}
                                value={age}
                            />
                            <TextField
                                label="Numer kontaktowy"
                                onChange={e => setPhoneNumber(e.target.value)}
                                required
                                variant="standard"
                                color="secondary"
                                type="text"
                                sx={textFieldStyle}
                                value={phoneNumber}
                            />
                            <TextField
                                label="Profesja"
                                onChange={e => setProfession(e.target.value)}
                                required
                                variant="standard"
                                color="secondary"
                                type="text"
                                sx={textFieldStyle}
                                value={profession}
                            />
                            <TextField
                                label="Opis"
                                onChange={e => setDescription(e.target.value)}
                                variant="standard"
                                color="secondary"
                                type="text"
                                sx={textFieldStyle}
                                value={description}
                                helperText="Możesz go edytować w dowolnym momencie"
                                multiline
                                maxRows={8}
                            />
                            <Box sx={divStyle} component="div">
                                <Button component="label" sx={buttonStyle}>
                                    <AddAPhotoIcon />
                                    <input
                                        type="file"
                                        hidden
                                        id="image"
                                        name="image"
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