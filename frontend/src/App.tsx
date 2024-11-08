import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import {useEffect, useState} from "react";
import {getAuthToken} from "./services/BackendService";
import {jwtDecode} from "jwt-decode";
import UserProfile from "./pages/candidate/UserProfile";
import SignUpHR from "./pages/SignUpHR";
import HRProfile from "./pages/hr/HRProfile";
import Candidate from "./pages/hr/Candidate";
import HRInfo from "./pages/hr/HRInfo";
import Favourites from "./pages/hr/Favourites";


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
                <Route path="/profile" element={<UserProfile />}></Route>
                <Route path="/profileHR" element={<HRProfile />}></Route>
                <Route path="/candidate" element={<Candidate />}/>
                <Route path="/infoHR" element={<HRInfo />}/>
                <Route path="/myFavourites" element={<Favourites />}/>
            </Routes>
        </BrowserRouter>
    )
}