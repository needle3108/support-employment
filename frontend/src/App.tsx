import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import {useEffect, useState} from "react";
import {getAuthToken} from "./services/BackendService";
import {jwtDecode} from "jwt-decode";
import UserProfile from "./pages/UserProfile";
import SignUpHR from "./pages/SignUpHR";
import HRProfile from "./pages/HRProfile";
import Candidate from "./pages/Candidate";
import HRInfo from "./pages/HRInfo";


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
                <Route path="/signupHR" element={<SignUpHR />}/>
                <Route path="/login" element={<Login />}/>
                {isAuthenticated && <Route path="/profile" element={<UserProfile />}></Route>}
                <Route path="/profileHR" element={<HRProfile />}></Route>
                <Route path="/candidate" element={<Candidate />}/>
                <Route path="/infoHR" element={<HRInfo />}/>
            </Routes>
        </BrowserRouter>
    )
}