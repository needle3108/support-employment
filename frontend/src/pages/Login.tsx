import React, {useState} from "react";
import {setAuthHeader} from "../services/BackendService";
import {Box, Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async(event: React.FormEvent<HTMLFormElement>) => {
        try{
            event.preventDefault();
            fetch("http://localhost:8080/auth/signin", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({email: email, password: password})
            }).then(response => {
                if (response.status == 200) {
                    return response.json();
                }
                else {
                    return null;
                }
            }).then(data => {
                if (data !== null) {
                    setAuthHeader(data["token"]);
                    setTimeout(navigate, 0, "/profile", { replace: true });
                }
                else {
                    setAuthHeader(null);
                    setTimeout(navigate, 0, "/login", { replace: true });
                }
            })
        } catch (error) {
            console.error("Błąd logowania: ", error);
        }
    }

    return (
        <Box>
            <form autoComplete="off" onSubmit={handleLogin}>
                <h2>Logowanie</h2>
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
                <Button type="submit" color="primary">Zaloguj się</Button>
            </form>
        </Box>
    );
}