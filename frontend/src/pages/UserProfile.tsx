import {Box} from "@mui/material";
import UserNavbar from "../components/UserNavbar";
import {useEffect, useState} from "react";
import {getAuthToken} from "../services/BackendService";

export default function UserProfile() {
    const[firstName, setFirstName] = useState("");

    useEffect(() => {
        try{
            fetch("http://localhost:8080/user/profile", {
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
                if (data !== null) {
                    setFirstName(data["firstName"]);
                }
            })
        } catch (error) {
            console.error("Błąd pobierania danych: ", error);
        }
    }, [])

    return (
        <Box>
            <UserNavbar />
            <Box>
                <span>{firstName}</span>
            </Box>
        </Box>
    )
}