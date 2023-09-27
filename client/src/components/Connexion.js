import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useState, useRef } from 'react';
import { useSignIn } from "react-auth-kit";
//import {useIsAuthenticated} from 'react-auth-kit';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Messages } from 'primereact/messages';
import { useNavigate } from "react-router-dom";
//import logo from "../logo.svg";
import logo from "../assets/laMarahoue.png";

const  userService  = require("../services/UserService.js");

function Connexion() {
    const [checked, setChecked] = useState(false);
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    //const isAuthenticated = useIsAuthenticated();
    const signIn = useSignIn();
    const navigate = useNavigate();
    const msgs = useRef(null);

    function handleInputEmail(e) {
		setInputEmail(e.target.value)
	}

    function handleInputPassword(e) {
		setInputPassword(e.target.value)
	}
/*
	function validateEmail() {
        msgs.current.clear();
		if (!inputEmail.includes('@')) {       
            msgs.current.show(
                { severity: 'error', summary: 'Attention', detail: "Il n'y a pas d'@, ceci n'est pas une adresse mail valide", sticky: true, closable: false }
            );
		}
	}
*/
    const seconnecter = () => {
        msgs.current.clear();
        if (!inputEmail || !inputPassword){
            msgs.current.show(
                { severity: 'error', summary: 'Attention', detail: "Nom d'utilisateur et Mot de passe requis", sticky: true, closable: false }
            );
        } else {
            const userData = { username: inputEmail, password: inputPassword};
            userService.loginUser(userData).then(res => {
                if (res.status !== 200){
                    res.json().then(data => 
                        msgs.current.show(
                            { severity: 'error', summary: 'Attention', detail: data.message, sticky: true, closable: false }
                    ))
                } else {
                    res.json().then(data => {    
                        signIn({
                            token: data.token,
                            tokenType: "Bearer",
                            expiresIn: 60,
                            authState: { username: data.user.username, nomprenom: data.user.nomprenom, email: data.user.email, profile: data.user.profile }
                        });  
                        navigate("/accueil");     
                    });
                }
            })
        }
    }

    return (
        <div className="flex align-items-center justify-content-center">
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-4" style={{marginTop: "0px"}}>
                <div className="text-center mb-5">
                    <img src={logo} alt="hyper" height={100} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Bienvenue</div>
                    <span className="text-600 font-medium line-height-3">Vous n'avez pas de compte?</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Créer un compte!</a>
                </div>

                <div>
                    <Messages ref={msgs} />

                    <label htmlFor="email" className="block text-900 font-medium mb-2">Nom d'utilisateur</label>
                    <InputText id="email" type="text" placeholder="Nom utilisateur" className="w-full mb-3" 
                               value={inputEmail} onChange={handleInputEmail}/>

                    <label htmlFor="password" className="block text-900 font-medium mb-2">Mot de passe</label>
                    <InputText id="password" type="password" placeholder="Mot de passe" className="w-full mb-3"
                               value={inputPassword} onChange={handleInputPassword}/>

                    <div className="flex align-items-center justify-content-between mb-6">
                        <div className="flex align-items-center">
                            <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                            <label htmlFor="rememberme">Se souvenir de moi</label>
                        </div>                  
                        <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Mot de passe oublié?</a>
                    </div>
                    <Button label="Se connecter" icon="pi pi-user" className="mr-3 p-button-raised w-full" onClick={seconnecter}/>                  
                </div>
            </div>
        </div> 
    );

}

export default Connexion;