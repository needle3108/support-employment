import React, {useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

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
    const [photoFilePath, setPhotoFilePath] = useState("");

    const navigate = useNavigate();

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    city: city,
                    age: age,
                    description: description,
                    phoneNumber: phoneNumber,
                    profession: profession,
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
                        onChange={e => setFirstName(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="text"
                        sx={{mb: 3}}
                        fullWidth
                        value={firstName}
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
                        label="Wiek"
                        type="number"
                        onChange={e => setAge(parseInt(e.target.value, 10))}
                        required
                        variant="outlined"
                        color="secondary"
                        sx={{mb: 3}}
                        fullWidth
                        value={age}
                    />
                    <TextField
                        label="Numer kontaktowy"
                        onChange={e => setPhoneNumber(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="text"
                        sx={{mb: 3}}
                        fullWidth
                        value={phoneNumber}
                    />
                    <TextField
                        label="Profesja"
                        onChange={e => setProfession(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="text"
                        sx={{mb: 3}}
                        fullWidth
                        value={profession}
                    />
                    <TextField
                        label="Opis (możesz go edytować w dowolnym momencie)"
                        onChange={e => setDescription(e.target.value)}
                        variant="outlined"
                        color="secondary"
                        type="text"
                        sx={{mb: 3}}
                        fullWidth
                        value={description}
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