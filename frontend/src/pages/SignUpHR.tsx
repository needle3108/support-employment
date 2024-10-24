import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, TextField} from "@mui/material";

export default function SignUpHR(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [photoFilePath, setPhotoFilePath] = useState("");

    const navigate = useNavigate();

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
            <form autoComplete="off" onSubmit={handleRegister}>
                <h2>Rejestracja</h2>
                <TextField
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                    value={email}
                />
                <TextField
                    label="Hasło"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    sx={{mb: 3}}
                    fullWidth
                    value={password}
                />
                <TextField
                    label="Imię"
                    onChange={e => setName(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={name}
                />
                <TextField
                    label="Nazwisko"
                    onChange={e => setLastName(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={lastName}
                />
                <TextField
                    label="Miasto"
                    onChange={e => setCity(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={city}
                />
                <TextField
                    label="Nazwa firmy"
                    onChange={e => setCompanyName(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={companyName}
                />
                <TextField
                    label="Zdjęcie"
                    onChange={e => setPhotoFilePath(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    placeholder="Uploading images feature is coming!"
                    value={photoFilePath}
                />
                <Button type="submit" color="primary">Utwórz konto</Button>
            </form>
        </Box>
    )
}