import {useIsAuthenticated} from 'react-auth-kit';
import { useNavigate } from "react-router-dom";

export default function AuthComponent({ currentPath, redirectionPath }) {

    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    if (isAuthenticated()){
       
        navigate("/accueil")
    }else {
        navigate("/")
    }
}
