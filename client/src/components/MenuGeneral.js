import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/MenuGeneral.css';
import { useState } from 'react';
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
//import { Tooltip } from 'primereact/tooltip';
//import { InputText } from 'primereact/inputtext';
//import logoUser from "../assets/logo_user.png";
import armoirie from "../assets/armoiries.png";
//import { menuItems } from "../datas/MenuItems.js"

function MenuGeneral() {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const signOut = useSignOut();
/*
    const items = [
        {
            label: 'Accueil',
            icon: 'pi pi-home',
            command: () => navigate('/accueil')
        },            
        {
            label: 'Saisie',
            icon: 'pi pi-fw pi-pencil',
            command: () => navigate('/saisie')
        },
        {
            label: 'Municipale',
            icon: 'pi pi-fw pi-pencil',
            command: () => navigate('/saisie-mairie')
        },
        {
            label: 'Regionale',
            icon: 'pi pi-fw pi-pencil',
            command: () => navigate('/saisie-region')
        },
        {
            label: 'Consultation',
            icon: 'pi pi-envelope',
            command: () => navigate('/consultation')
        },  
        {
            label: 'Parametrage',
            icon: 'pi pi-cog',
            command: () => navigate('/parametrage')
        },  
        {
            label: 'Page Template',
            icon: 'pi pi-star',
            command: () => navigate('/template')
        },  
        {
            label: '',
            icon: 'pi pi-th-large'
        },     
        {
            label: 'Quitter',
            icon: 'pi pi-fw pi-power-off',
            command: () => setVisible(true)
        }
    ];
*/
    const itemsMairie = [
        {
            label: 'Accueil',
            icon: 'pi pi-home',
            command: () => navigate('/accueil')
        },            
        {
            label: 'Vote Municipale',
            icon: 'pi pi-fw pi-pencil',
            command: () => navigate('/saisie-mairie')
        },
        {
            label: 'Resultat Municipale',
            icon: 'pi pi-envelope',
            command: () => navigate('/consultation')
        },  
        {
            label: 'Statistiques',
            icon: 'pi pi-chart-bar',
            //command: () => navigate('/parametrage')
        }, 
        {
            label: 'Parametrage',
            icon: 'pi pi-cog',
            command: () => navigate('/parametrage')
        }
    ];

    const start = <img alt="logo" src={armoirie} height="40" className="mr-2"></img>;
    const end = <div>
                    <div className="flex align-items-center justify-content-center border-round btn-quitter"> 
                        <i className="pi pi-power-off text-red-500 text-xl" onClick={() => setVisible(true)}/>                    
                    </div>                                     
                </div>;                  
                
    //const end = <InputText placeholder="Search" type="text" className="w-full" />; <img alt="logo" src={logoUser} height="30" className="mr-2"/>
    const footerContent = (
        <div>
            <Button label="Non" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Oui" icon="pi pi-check" onClick={() => seDeconnecter()} autoFocus />
        </div>
    );

    function seDeconnecter() {
        signOut();
        setVisible(false);
        navigate('/');
    }

    return (
        <div className="card">    
            <Menubar model={itemsMairie} start={start} end={end}/>       
            <Dialog header="Se deconnecter" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <p className="m-0">
                    Voulez-vous quitter l'application ?
                </p>
            </Dialog>      
        </div>
    );
}

export default MenuGeneral;