import axios from "axios";
import {useState} from "react";
import {Box, Button} from "@mui/material";

export default function MainPage(){

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[city, setCity] = useState("");
    const[age, setAge] = useState(20);
    const[description, setDescription] = useState("");
    const[phoneNumber, setPhoneNumber] = useState("");
    const[profession, setProfession] = useState("");
    const[photoFilePath, setPhotoFilePath] = useState("");

    const handleRegister = async() => {
        try{
            const response = await axios.post(
                "http://localhost:8080/auth/signup",
                {
                    email: "v@v.pl",
                    password: "password",
                    firstName: "firstName",
                    lastName: "lastName",
                    city: "city",
                    age: 22,
                    description: "description",
                    phoneNumber: "phoneNumber",
                    profession: "profession",
                    photoFilePath: "photoFilePath"
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )

            console.log("Signup successful!");
            console.log(response);
            console.log(response.data);
        } catch (error) {
            console.error("Błąd rejestracji:", error);
        }
    }

    return (
        <Box>
            <button onClick={handleRegister}>Zarejestruj się</button>
        </Box>
    )
}