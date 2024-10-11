import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";


export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/signup" element={<SignUp />}/>
            </Routes>
        </BrowserRouter>
    )
}