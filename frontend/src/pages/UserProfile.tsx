import {useNavigate} from "react-router-dom";
import {setAuthHeader} from "../services/BackendService";
import {Box, Button} from "@mui/material";

export default function UserProfile() {
    const navigate = useNavigate();

    const handleLogout= () => {
        setAuthHeader(null);
        navigate("/");
    }

    return (
        <Box>
            <Button onClick={handleLogout}>Wyloguj się</Button>
        </Box>
    )
}