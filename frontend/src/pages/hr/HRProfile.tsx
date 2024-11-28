import {Alert, Avatar, Badge, Box, Button, ButtonBase, Card, CardContent, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getAuthToken} from "../../services/BackendService";
import {useNavigate} from "react-router-dom";
import HRNavbar from "../../components/HRNavbar";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {grey} from "@mui/material/colors";

const cardStyle = {
    position: 'relative',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    width: '200px',
    height: '280px',
    margin: '12px',
    textAlign: 'center',
    '&:hover': { background: 'radial-gradient(circle, rgba(211,185,227,1) 0%, rgba(210,210,210,1) 100%, rgba(0,212,255,1) 100%)'}
}

const avatarStyle = {
    width: '150px',
    height: '150px',
    margin: 'auto',
    mt: '10px',
    mb: '10px'
}

const textFieldStyle = {
    width: '20%',
    margin: 1,
    mb: 2
}

const buttonStyle = {
    margin: 1,
    bgcolor: 'rgb(96,58,120)',
    color: 'white',
    borderRadius: '5px',
    top: '30%',
    '&:hover': { bgcolor: "rgb(207, 159, 255)"}
}


export default function HRProfile(){
    const[candidates, setCandidates] = useState([]);
    const[favourites, setFavourites] = useState<any[]>([]);

    const[city, setCity] = useState("");
    const[profession, setProfession] = useState("");
    const[minAge, setMinAge] = useState("");
    const[maxAge, setMaxAge] = useState("");

    const[error, setError] = useState<null | string>(null);

    const navigate = useNavigate();

    useEffect(() => {
        try{
            fetch("http://localhost:8080/userHR/getCandidates", {
                method: "GET",
                headers: {'Authorization': `Bearer ${getAuthToken()}`},
            }).then(response => {
                if(response.status === 200){
                    return response.json();
                }
                else{
                    return null;
                }
            }).then(data => {
                if (data !== null){
                    setCandidates(data);
                }
            })

            fetch("http://localhost:8080/userHR/getFavourites", {
                method: "GET",
                headers: {'Authorization': `Bearer ${getAuthToken()}`},
            }).then(res => {
                if(res.status === 200){
                    return res.json();
                }
                else{
                    return null;
                }
            }).then(d => {
                if (d !== null){
                    setFavourites(d);
                }
            })
        }
        catch (error) {
            console.error("Błąd pobierania danych: ", error);
        }
    },[])

    const getCandidate = (id: string) => {
        navigate("/candidate", {state: {id: id}});
    }

    const handleSubmit = () => {
        try{
            if(city === "" && profession === "" && minAge === "" && maxAge === ""){
                throw new Error("Musi być podane przynajmniej jedno kryterium");
            }

            if(parseInt(minAge) <= 16 || parseInt(maxAge) <= 16){
                throw new Error("Wiek nie może być mniejszy niż 16!");
            }

            const formData = new FormData();

            formData.append('city', city);
            formData.append('profession', profession);
            formData.append('minAge', minAge);
            formData.append('maxAge', maxAge);

            fetch("http://localhost:8080/userHR/getCandidatesFilter", {
                method: 'POST',
                headers: {'Authorization': `Bearer ${getAuthToken()}`},
                body: formData
            }).then(result => {
                if (result.status == 200){
                    return result.json();
                }

            }).then(data => {
                if(data !== null){
                    if(data["candidates"].length === 0){
                        throw new Error("Nie znaleziono kandydatów spełniających podane kryteria!")
                    }
                    console.error(data["candidates"][0])
                    console.error(data['candidates'].length)
                    setCandidates(data['candidates']);
                    setFavourites(data['favourites']);

                    if(error !== null){
                        setError(null);
                    }
                }
            }).catch((error) => {
                setError((error as Error).message);
                console.error(error);
            })
        }
        catch(error){
            setError((error as Error).message);
            console.error((error as Error).message);
        }
    }

    return (
        <Box sx={{bgcolor: grey[200], height: '100%', width: '100%', left: 0, top: 0, overflow: 'auto', position: 'fixed'}}>
            <HRNavbar />
            <Box sx={{mt: 2, mb: 2}}>
                <Card sx={{
                    position: 'relative',
                    width: '80%',
                    left: '10%',
                    textAlign: 'center',
                    '&:hover': { background: 'radial-gradient(circle, rgba(211,185,227,1) 0%, rgba(210,210,210,1) 100%, rgba(0,212,255,1) 100%)'}
                }}>
                    <Typography variant="h5">Opcje filtrowania</Typography>
                    {error &&
                        <Box sx={{display: 'flex', justifyContent: "center", textAlign: "center", margin: 2}}>
                            <Alert severity="error">{error}</Alert>
                        </Box>
                    }
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <TextField
                            label="Miasto"
                            onChange={e => setCity(e.target.value)}
                            variant="standard"
                            color="secondary"
                            value={city}
                            sx={textFieldStyle}
                        />
                        <TextField
                            label="Profesja"
                            onChange={e => setProfession(e.target.value)}
                            variant="standard"
                            color="secondary"
                            value={profession}
                            sx={textFieldStyle}
                        />
                        <TextField
                            label="Minimalny wiek"
                            onChange={e => setMinAge(e.target.value)}
                            variant="standard"
                            color="secondary"
                            value={minAge}
                            sx={textFieldStyle}
                        />
                        <TextField
                            label="Maksymalny wiek"
                            onChange={e => setMaxAge(e.target.value)}
                            variant="standard"
                            color="secondary"
                            value={maxAge}
                            sx={textFieldStyle}
                        />
                    </Box>
                    <Box>
                        <Button sx={buttonStyle} onClick={handleSubmit}>Szukaj</Button>
                    </Box>
                </Card>
            </Box>
            <Box sx={{display: 'flex'}}>
            {
                 candidates.map(candidate => (
                     <Card key={candidate["id"]} sx={cardStyle}>
                         <ButtonBase onClick={() => getCandidate(candidate["id"])}>
                             <CardContent>
                                 {(favourites.length > 0 && favourites.some(el => el.idCandidate === candidate["id"])) ?
                                     <Badge
                                         overlap="circular"
                                         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                         badgeContent={
                                             <FavoriteIcon sx={{color: 'red', width: '40px', height: '40px'}}/>
                                         }
                                     >
                                         <Avatar src={"data:image/png;base64,"+candidate['photoFilePath']} sx={avatarStyle}></Avatar>
                                     </Badge> :
                                     <Avatar src={"data:image/png;base64,"+candidate['photoFilePath']} sx={avatarStyle}></Avatar>
                                 }
                                 <Typography variant="h6">
                                     {candidate["firstName"]} {candidate["lastName"]}
                                 </Typography>
                                 <Typography variant="subtitle1">
                                     {candidate["profession"]}
                                 </Typography>
                                 <Typography variant="subtitle2">
                                     {candidate["city"]}
                                 </Typography>
                             </CardContent>
                        </ButtonBase>
                     </Card>
                ))
            }
            </Box>
        </Box>
    )
}