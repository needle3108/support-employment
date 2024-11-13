import {useEffect, useState} from "react";
import {Avatar, Box, Typography} from "@mui/material";
import {getAuthToken} from "../services/BackendService";

export default function MessageSidebar(){
    const [contacts, setContacts] = useState<any[]>([]);

    useEffect(() => {
        try{
            fetch("http://localhost:8080/userHR/getMyContacts", {
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
                    setContacts(data);
                }
            })
        }
        catch (error) {
            console.error("Błąd pobierania danych: ", error);
        }
    }, []);

    return (
        <Box sx={{
            width: 300,
            bgcolor: 'background.paper',
            borderRight: 1,
            borderColor: 'divider',
            mt: '5%',
            height: '80%',
            overflow: 'auto'
        }}>
            {contacts.map((contact) => (
                <Box key = {contact['id']}
                     sx = {{
                         p: 2,
                         display: 'flex',
                         alignItems: 'center',
                         cursor: 'pointer',
                         transition: 'background-color 0.3s'
                     }}>
                    <Avatar src={"data:image/png;base64,"+contact['image']}></Avatar>
                    <Box sx={{ml: 2}}>
                        <Typography variant='subtitle1'>{contact['firstName']} {contact['lastName']}</Typography>
                    </Box>
                </Box>
            ))
            }
        </Box>
    )
}