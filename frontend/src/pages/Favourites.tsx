import React, {useEffect, useState} from "react";
import {getAuthToken} from "../services/BackendService";
import {Avatar, Badge, Box, ButtonBase, Card, CardContent, Typography} from "@mui/material";
import HRNavbar from "../components/HRNavbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useNavigate} from "react-router-dom";

const cardStyle = {
    position: 'relative',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    width: '200px',
    height: '280px',
    margin: '12px',
    textAlign: 'center',
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
    }, []);

    const getCandidate = (id: string) => {
        navigate("/candidate", {state: {id: id}});
    }

    return(
        <Box>
            <HRNavbar />
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
                        </Card>
                    ))
                }
            </Box>
        </Box>
    )
}