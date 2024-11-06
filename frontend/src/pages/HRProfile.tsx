import {Avatar, Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import UserNavbar from "../components/UserNavbar";
import {useEffect, useState} from "react";
import {getAuthToken} from "../services/BackendService";

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

export default function HRProfile(){
    const[candidates, setCandidates] = useState([]);

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

        }
        catch (error) {
            console.error("Błąd pobierania danych: ", error);
        }
    },[])


    return (
        <Box>
            <UserNavbar />
            <Box sx={{display: 'flex'}}>
            {
                 candidates.map(candidate => (
                     <Card key={candidate["id"]} sx={cardStyle}>
                         <CardActionArea>
                             <CardContent>
                                 <Typography>
                                 </Typography>
                                 <Avatar src={"data:image/png;base64,"+candidate['photoFilePath']} sx={avatarStyle}></Avatar>
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
                         </CardActionArea>
                     </Card>
                ))
            }
            </Box>
        </Box>
    )
}