import React, {useState} from "react";
import {setAuthHeader} from "../services/BackendService";
import {Alert, Box, Button, Card, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import {grey} from "@mui/material/colors";

const cardStyle = {
    position: 'absolute',
    top: '20%',
    left: '33%',
    right: '33%',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    textAlign: 'center',
    '&:hover': { background: 'radial-gradient(circle, rgba(211,185,227,1) 0%, rgba(210,210,210,1) 100%, rgba(0,212,255,1) 100%)'}
}

const textFieldStyle = {
    mt: '20px',
    width: '80%'
}

const buttonStyle = {
    margin: '0',
    bgcolor: 'rgb(96,58,120)',
    color: 'white',
    borderRadius: '5px',
    top: '30%',
    '&:hover': { bgcolor: "rgb(207, 159, 255)"}
}

const divStyle = {
    height: '80px',
    position: 'relative',
    textAlign: 'center',
}

export default function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const [error, setError] = useState<null | string>(null);

    const navigate = useNavigate();

    const handleLogin = async(event: React.FormEvent<HTMLFormElement>) => {
        try{
            event.preventDefault();
            await fetch("http://localhost:8080/auth/signin", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({email: email, password: password})
            }).then(async response => {
                if (response.status === 200) {
                    return response.json();
                }

                const msg = await response.json();
                throw new Error(msg["message"]);
            }).then(data => {
                if (data !== null) {
                    setAuthHeader(data["token"]);
                    if (data["role"] === "USER"){
                        setTimeout(navigate, 0, "/profile", { replace: true });
                    }
                    else{
                        setTimeout(navigate, 0, "/profileHR", { replace: true });
                    }
                }
            }).catch((error) => {
                setError((error as Error).message);
                console.error(error);
            })
        } catch (error) {
            setError((error as Error).message);
            console.error((error as Error).message);
        }
    }

    return (
        <Box sx={{bgcolor: grey[200], height: '100%', width: '100%', left: 0, top: 0, overflow: 'auto', position: 'fixed'}}>
            <Navbar />
            <Card sx={cardStyle}>
                <form autoComplete="off" onSubmit={handleLogin}>
                    <Box>
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
                    </Box>
                    <Box>
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
                    </Box>
                    <Box sx={divStyle} component="div">
                        <Button type="submit" sx={buttonStyle}>Zaloguj się</Button>
                    </Box>
                    {error &&
                        <Box sx={{display: 'flex', justifyContent: "center", textAlign: "center", margin: 2}}>
                            <Alert severity="error">{error}</Alert>
                        </Box>
                    }
                </form>
            </Card>
        </Box>
    );
}