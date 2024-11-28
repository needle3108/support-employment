import React, {useState} from "react";
import {Alert, Avatar, Box, Button, Card, TextField} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Navbar from "../components/Navbar";
import {grey} from "@mui/material/colors";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from "dayjs";
import {format} from "date-fns";

const cardStyle = {
    position: 'relative',
    mt: 7,
    ml: 30,
    mr: 30,
    mb: 5,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    '&:hover': { background: 'radial-gradient(circle, rgba(211,185,227,1) 0%, rgba(210,210,210,1) 100%, rgba(0,212,255,1) 100%)'}
}

const textFieldStyle = {
    left: '10%',
    mr: '20px',
    mt: '20px',
    width: '25%'
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

const avatarStyle = {
    width: '230px',
    height: '230px',
    margin: 'auto',
    mt: '10px'
}

export default function SignUp(){
    //Candidates credentials
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(dayjs());
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profession, setProfession] = useState("");
    const [file, setFile] = useState<File | undefined>();

    //Additional credentials for HR
    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");

    const [preview, setPreview] = useState("");

    const [error, setError] = useState<null | string>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const handleUploadPhoto = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement & {
            files: FileList;
        }

        setFile(target.files[0]);
        setPreview(URL.createObjectURL(target.files[0]));
    }

    const handleRegisterCandidate = (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            const formData = new FormData();

            formData.append('email', email);
            formData.append('password', password);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('city', city);
            formData.append('dateOfBirth', format(dateOfBirth!.toDate(), "yyyy-MM-dd"));
            formData.append('description', description);
            formData.append('phoneNumber', phoneNumber);
            formData.append('profession', profession);

            if (typeof file === 'undefined'){
                throw new Error("Zdjęcie jest wymagane!");
            }
            else{
                formData.append('file', file);
            }

            fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                body: formData
            }).then(async response => {
                if (response.status === 200) {
                    return response.json();
                }
                const msg = await response.json();
                throw new Error(msg["message"]);
            }).then(data => {
                if (data !== null) {
                    setTimeout(navigate, 0, "/login", { replace: true });
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

    const handleRegisterHR = (event: React.FormEvent<HTMLFormElement>) => {
        try{
            event.preventDefault();

            const formData = new FormData();

            formData.append('email', email);
            formData.append('password', password);
            formData.append('name', name);
            formData.append('lastName', lastName);
            formData.append('city', city);
            formData.append('companyName', companyName);

            if (typeof file === 'undefined'){
                throw new Error("Zdjęcie jest wymagane!");
            }
            else{
                formData.append('file', file);
            }

            fetch("http://localhost:8080/auth/signupHR", {
                method: "POST",
                body: formData
            }).then(async response => {
                if (response.status === 200) {
                    return response.json();
                }
                const msg = await response.json();
                throw new Error(msg["message"]);
            }).then(data => {
                if (data !== null) {
                    setTimeout(navigate, 0, "/login", { replace: true });
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
                        <Avatar sx={avatarStyle} src={preview}/>
                        {error &&
                            <Box sx={{display: 'flex', justifyContent: "center", textAlign: "center", margin: 2}}>
                                <Alert severity="error">{error}</Alert>
                            </Box>
                        }
                        {location.pathname === "/signup" ?
                            <form autoComplete="off" onSubmit={handleRegisterCandidate}>
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
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        label="Data urodzenia"
                                        disableFuture={true}
                                        onChange={(age) => setDateOfBirth(age)}
                                        sx={{
                                            position: 'relative',
                                            margin: 2,
                                            width: '25%',
                                            ml: 17,
                                            mt: 3,
                                        }}
                                    />
                                </LocalizationProvider>
                                <Box sx={divStyle} component="div">
                                    <Button component="label" sx={buttonStyle}>
                                        <AddAPhotoIcon/>
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
                            </form> :
                            <form autoComplete="off" onSubmit={handleRegisterHR}>
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
                                <Box sx={divStyle} component="div">
                                    <Button component="label" sx={buttonStyle}>
                                        <AddAPhotoIcon/>
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
                        }
                    </Card>
            </Box>
        )
}