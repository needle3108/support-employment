import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import {useEffect, useState} from "react";
import {getAuthToken} from "./services/BackendService";
import {jwtDecode} from "jwt-decode";
import UserProfile from "./pages/UserProfile";


export default function App(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect( () => {
        let token = getAuthToken();
        if (token !== null) {
            setIsAuthenticated(true);
            const decoded = jwtDecode(token);
            console.log(decoded);
        }
        else {
            setIsAuthenticated(false);
        }
    }, [])

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/profile" element={<UserProfile />}></Route>
            </Routes>
        </BrowserRouter>
    )
}