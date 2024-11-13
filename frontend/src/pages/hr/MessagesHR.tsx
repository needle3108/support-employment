import {Box} from "@mui/material";
import HRNavbar from "../../components/HRNavbar";
import MessageSidebar from "../../components/MessageSidebar";

export default function MessagesHR(){
    return (
        <Box>
            <HRNavbar />
            <Box sx={{display: 'flex', height: '100vh'}}>
                <MessageSidebar />
            </Box>
        </Box>
    )
}