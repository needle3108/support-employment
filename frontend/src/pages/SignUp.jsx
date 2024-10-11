import {useState} from "react";
import axios from "axios";
import {Button, TextField} from "@mui/material";

export default function SignUp(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[city, setCity] = useState("");
    const[age, setAge] = useState(20);
    const[description, setDescription] = useState("");
    const[phoneNumber, setPhoneNumber] = useState("");
    const[profession, setProfession] = useState("");
    const[photoFilePath, setPhotoFilePath] = useState("");

    const handleRegister = async() => {
        try {
            const response = await axios.post(
                "http://localhost:8080/auth/signup",
                {
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
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )

            console.log("Signup successful!");

            console.log(response.data.message);
        } catch (error) {
            console.error("Błąd rejestracji:", error);
        }
    }

        return (
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
                    onChange={e => setAge(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="number"
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
        )
}