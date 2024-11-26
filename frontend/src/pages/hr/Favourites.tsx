import React, {useEffect, useState} from "react";
import {getAuthToken} from "../../services/BackendService";
import {Alert, Avatar, Badge, Box, ButtonBase, Card, CardContent, IconButton, Typography} from "@mui/material";
import HRNavbar from "../../components/HRNavbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useNavigate} from "react-router-dom";
import {grey} from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';

const cardStyle = {
    position: 'relative',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    width: '200px',
    height: '330px',
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

export default function Favourites(){
    const[candidates, setCandidates] = useState([]);

    const[serverMessage, setServerMessage] = useState<null | string>(null);

    const navigate = useNavigate();

    useEffect(() => {
        try{
            fetch("http://localhost:8080/userHR/getMyFavourites", {
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
                    setCandidates(d);
                }
            })
        }
        catch (error) {
            console.error("Błąd pobierania danych: ", error);
        }
    }, [serverMessage]);

    const getCandidate = (id: string) => {
        navigate("/candidate", {state: {id: id}});
    }

    const handleClick = (id: string) => {
        const formData = new FormData();
        formData.append('id', id);

        fetch("http://localhost:8080/userHR/deleteFavourite", {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${getAuthToken()}`},
            body: formData
        }).then(response => {
            if(response.status === 200){
                return response.json();
            }
        }).then(data => {
            if(data !== null){
                setServerMessage(data['message']);
            }
        })
    }

    return(
        <Box sx={{bgcolor: grey[200], height: '100%', width: '100%', left: 0, top: 0, overflow: 'auto', position: 'fixed'}}>
            <HRNavbar />
            {serverMessage &&
                <Box sx={{display: 'flex', justifyContent: "center", textAlign: "center", margin: 2}}>
                    <Alert severity="success">{serverMessage}</Alert>
                </Box>
            }
            <Box sx={{display: 'flex'}}>
                {
                    candidates.map(candidate => (
                        <Card key={candidate["id"]} sx={cardStyle}>
                            <ButtonBase onClick={() => getCandidate(candidate["id"])}>
                                <CardContent>
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={
                                        <FavoriteIcon sx={{color: 'red', width: '40px', height: '40px'}}/>
                                        }
                                    >
                                        <Avatar src={"data:image/png;base64,"+candidate['photoFilePath']} sx={avatarStyle}></Avatar>
                                    </Badge>
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
                            <IconButton
                                color="primary"
                                onClick={() => handleClick(candidate["id"])}
                                aria-label="usun z ulubionych"
                                sx={{
                                    bgcolor: 'rgb(96,58,120)',
                                    color: "white",
                                    '&:hover': { bgcolor: "rgb(207, 159, 255)"}
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Card>
                    ))
                }
            </Box>
        </Box>
    )
}