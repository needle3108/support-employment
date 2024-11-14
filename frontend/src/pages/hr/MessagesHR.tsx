import {Avatar, Box, IconButton, Paper, TextField, Typography, useTheme} from "@mui/material";
import HRNavbar from "../../components/HRNavbar";
import {useEffect, useRef, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {getAuthToken} from "../../services/BackendService";

export default function MessagesHR(){
    const theme = useTheme();

    const [current, setCurrent] = useState("");
    const [contacts, setContacts] = useState<any[]>([]);

    const[message, setMessage] = useState("");
    const[messages, setMessages] = useState<any[]>([]);

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }

    useEffect(() => {
        try{
            const fC = async function fetchContacts(){
                await fetch("http://localhost:8080/userHR/getMyContacts", {
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
                        setCurrent(data[0]["id"]);
                    }
                })
            }

            const fM = async function fetchMessages(){
                await fetch("http://localhost:8080/userHR/getMessages", {
                    method: "POST",
                    headers: {'Authorization': `Bearer ${getAuthToken()}`},
                    body: JSON.stringify({id: current})
                }).then(response => {
                    if(response.status === 200){
                        return response.json();
                    }
                    else{
                        return null;
                    }
                }).then(data => {
                    if (data !== null){
                        setMessages(data);
                    }
                })
                scrollToBottom();
            }

            fC();
            fM();
        }
        catch (error) {
            console.error("Błąd pobierania danych: ", error);
        }
    }, [current]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                sender: "HR",
                timestamp: new Date().toLocaleDateString([], {hour: '2-digit', minute: '2-digit'}),
            };
            setMessages([...messages, newMessage]);
            setMessage("");
        }
    }

    const handleKeyDown = (e: any) => {
        if (e.code === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    }

    return (
        <Box>
            <HRNavbar />
            <Box sx={{display: 'flex', height: '91vh'}}>
                <Box sx={{
                    width: 300,
                    bgcolor: 'background.paper',
                    borderRight: 1,
                    borderColor: 'divider',
                    mt: '1%',
                    height: '99%',
                    overflow: 'auto'
                }}>
                    {contacts.map((contact) => (
                        <Box key = {contact['id']}
                             onClick={() => setCurrent(contact['id'])}
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
                <Box sx={{display: 'flex', flexGrow: 1, flexDirection: 'column'}}>
                    <Box sx={{
                        p: 2,
                        borderBottom: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Avatar src={"T"}></Avatar>
                        <Box sx={{ml:2}}>
                            <Typography variant="h6">Aktualny chat</Typography>
                        </Box>
                    </Box>
                    <Box sx={{
                        flexGrow: 1,
                        p: 2,
                        overflow: 'auto',
                        bgcolor: 'grey.50'
                    }}>
                        {messages.map((msg) => (
                            <Box key={msg.id} sx={{
                                display: 'flex',
                                justifyContent: msg.sender === "HR" ? 'flex-end' : 'flex-start',
                                marginBottom: theme.spacing(2)
                            }}>
                                <Paper sx={{
                                    padding: theme.spacing(1.5),
                                    maxWidth: '70%',
                                    borderRadius: 5,
                                    backgroundColor: msg.sender === "HR" ? theme.palette.primary.main : theme.palette.grey[100],
                                    color: msg.sender === "HR" ? theme.palette.primary.contrastText : "inherit",
                                    position: 'relative',
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: theme.shadows[4],
                                    },
                                }}>
                                    <Typography>{msg.message}</Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        mt: 0.5,
                                        gap: 0.5
                                    }}>
                                        <Typography variant="caption" color={msg.sender === "HR" ? "inherit": "text.secondary"}>
                                            {msg.timestamp}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        ))}
                        <div ref={messagesEndRef}></div>
                    </Box>
                    <Box sx={{
                        p: 2,
                        borderTop: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.paper'
                    }}>
                        <Box sx={{display: 'flex', gap: 1}}>
                            <TextField
                                fullWidth
                                multiline
                                maxRows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Napisz wiadomość..."
                                variant="outlined"
                                size="small"
                                sx={{"& .MuiOutlinedInput-root": {borderRadius: 3}}}
                            />
                            <IconButton
                                color="primary"
                                onClick={handleSendMessage}
                                aria-label="wyślij wiadomość"
                                sx={{
                                    bgcolor: "primary.main",
                                    color: "white",
                                    "&:hover": { bgcolor: "primary.dark"}
                                }}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}