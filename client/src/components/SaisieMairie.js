import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import MenuGeneral from "./MenuGeneral";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Toolbar } from 'primereact/toolbar';
import { SelectButton } from 'primereact/selectbutton';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DataView  } from 'primereact/dataview';
//import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
//import { InputText } from 'primereact/inputtext';
//import { InputNumber } from 'primereact/inputnumber';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PublicIcon from '@mui/icons-material/Public';
import { getLieuVoteCommuneBouafle, getBureauVoteByLieu} from "../services/LieuvoteService";
import { getVoteByBureauMairie, getResultatMunicipalesByCentre } from "../services/VoterService";
import transition from "./transition";
//const lieuxService = require("../services/LieuvoteService.js");
//const voterService = require("../services/VoterService.js");

function SaisieMairie() {

    const items = [{ label: 'Application' }, { label: 'Saisie des votes' }];
    const home = { icon: 'pi pi-home', url: '/accueil' }
    const [lieuItems, setLieuItems] = useState([]);
    const [selectedLieu, setSelectedLieu] = useState(null);
    const [popInscrit, setPopInscrit] = useState(null);
    const [optionItems, setOptionItems] = useState([]);
    const [votesBureau, setVotesBureau] = useState([]);
    const [selectValue, setSelectValue] = useState(null);
    const [resultats, setResultats] = useState([]);
    const toast = useRef(null);
   
    useEffect(() => {   
        getLieuVoteCommuneBouafle().then(data => {       
            setLieuItems(data);
        })
    }, [])
    
    const handleClick = (e, id, name, nbreinscrit) => {
        //alert(name)
        setSelectedLieu({"name": name, "id": id});
        setPopInscrit(nbreinscrit);
        e.preventDefault();
        window.scrollTo({
            top: document.querySelector("#filAriane").offsetTop,
            behavior: "smooth",
        }); 
        getBureauVoteByLieu(id).then(data => {
            let bureauvote = data.map(b => `{"name": "${b.libbv}", "value": "${b.idbv}"}`);
            let jsonString = '[' + bureauvote + ']';
            let jsonObject = JSON.parse(jsonString);
            setOptionItems(jsonObject);
            jsonObject && setSelectValue(jsonObject[0].value);
            jsonObject && getVoteByBureauMairie(jsonObject[0].value).then(data => setVotesBureau(data));
        })
        getResultatMunicipalesByCentre(id).then(data => setResultats(data));

    }
/*
    const isPositiveInteger = (val) => {
        let str = String(val);

        str = str.trim();

        if (!str) {
            return false;
        }

        str = str.replace(/^0+/, '') || '0';
        let n = Math.floor(Number(str));

        return n !== Infinity && String(n) === str && n >= 0;
    };

    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        switch (field) {
            case 'score':
                if (isPositiveInteger(newValue)) rowData[field] = newValue;
                else event.preventDefault();
                break;

            default:
                if (newValue.trim().length > 0) rowData[field] = newValue;
                else event.preventDefault();
                break;
        }
        updateVote(rowData).then(data => {
            data.status === 200 ? toast.current.show({ severity: 'success', summary: 'Saisie de vote', detail: rowData.score + ' point(s) saisis pour le candidat ' + rowData.nomcand, life: 3000 }) :
                                  toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Votre saisie n\'a pas pu être enregistrée', life: 3000 });
            
            selectedLieu && getResultatMunicipalesByCentre(selectedLieu.id).then(data => setResultats(data));                      
        })
    };
*/
    const onValueChange = (newValue) => {
        setSelectValue(newValue);
        newValue ? getVoteByBureauMairie(newValue).then(data => setVotesBureau(data)) : setVotesBureau(null);
    }
/*
    const cellEditor = (options) => {
        if (options.field === 'score') return numberEditor(options);
        else return textEditor(options);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const numberEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} />;
    };
*/
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <SelectButton value={selectValue} onChange={(e) => onValueChange(e.value)} optionLabel="name" options={optionItems} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            popInscrit &&
            <div className="flex flex-wrap gap-2 text-xl pr-2">
                <label htmlFor="name" className="font-bold">Population electorale :</label>
                <label htmlFor="name" className="font-bold text-red-500">{popInscrit}</label>
            </div>
        );
    };

    const pourcentage = (resultat) => {
        //resultats && resultats.reduce((acc, r) => acc + r.score)
        const somme = resultats.reduce((acc, r) => acc + parseInt(r.score), 0);
        //return Math.round(resultat.score/somme*100);
        return somme === 0 ? 0 : (resultat.score/somme*100).toFixed(2);
    }

    const itemTemplate = (resultat) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-2 gap-4">
                    {/*<img className="w-4 sm:w-4rem xl:w-3rem shadow-2 block xl:block mx-auto border-round" src={otherCand} alt={resultat.nomcand} />*/}
                    <i className="pi pi-user text-primary text-xl"></i>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-2">
                            <div className="text-l font-bold">{resultat.nomcand}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="text-sm">{resultat.libparti} ({resultat.sigle})</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-xl font-semibold">{resultat.score}</span>
                            <span className="text-l text-green-500">{pourcentage(resultat)}%</span>
                        </div>
                    </div>
                </div>    
            </div>       
        );
    };

    const header = () => {
        return (
            <div>
                <span className="text-xl">Resultats de {selectedLieu.name}</span>
                <span className="text-xl text-red-500" style={{float: 'right'}}>&nbsp; {resultats.reduce((acc, r) => acc + parseInt(r.score), 0)}</span>
                <span className="text-xl" style={{float: 'right'}}>Suffrages exprimés : </span>               
            </div>
        );
    };

    return (
        <div>
            <MenuGeneral />
            <Toast ref={toast} />
            <div class="grid">
                <div class="col-fixed" style={{ width: '400px'}}>
                    <div className="col-12 p-2 text-center md:text-left flex align-items-center surface-0 text-800 shadow-4">

                        <div class="flex flex-column">
                            <div class="flex align-items-center justify-content-center h-3rem text-primary font-bold border-round text-xl">
                                <p class="uppercase">Commune de Bouafle</p>
                            </div>
                            <div class="flex align-items-center justify-content-center h-1rem text-primary font-bold border-round text-2xl">
                                ---------------
                            </div>
                            
                            <div class="flex align-items-center justify-content-center h-2rem text-primary font-bold border-round text-xl">
                                Lieux de vote
                            </div>                          
                            <div class="flex align-items-center justify-content-center border-round m-2">
                                {/*<Menu model={lieuItems} style={{width: '100%'}}/>*/}   
                                 
                                <MenuList style={{width: '100%'}} >
                                    {lieuItems.map((l) => (                                       
                                        <MenuItem key={l.idlieuvote} onClick={(e) => handleClick(e, l.idlieuvote, l.liblieuvote, l.nbreinscrit)}>
                                            <ListItemIcon>
                                                <PublicIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>{l.liblieuvote}</ListItemText>                                           
                                        </MenuItem>
                                    ))}
                                </MenuList>    
                                                                                 
                            </div>
                           
                        </div>

                    </div>
                </div>
                <div class="col">
                    <BreadCrumb model={items} home={home} className="filAriane" id="filAriane"/>
                    <div className="col-12 p-4 text-center md:text-left flex align-items-center surface-0 text-800">
                        <section id="top-section">
                            <span className="block text-6xl text-primary font-bold mb-1">Municipales 2023 - Commune de Bouafle</span>
                            {selectedLieu && <div className="text-6xl text-green-700 font-bold mb-3">Lieu de vote : {selectedLieu.name}</div>}
                            
                            <Toolbar className="mb-3 p-1" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                            <DataTable value={votesBureau} editMode="cell" showGridlines stripedRows tableStyle={{ minWidth: '50rem' }} >
                                {/*<Column field="idvote" header="Id"></Column>*/}
                                <Column field="sigle" header="Parti" ></Column>
                                <Column field="nomcand" header="Candidat" ></Column>
                                <Column field="nomliste" header="Liste" ></Column>
                                <Column field="score" header="Score" /*editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}*/></Column>
                            </DataTable> 
                            {selectedLieu && <DataView value={resultats} itemTemplate={itemTemplate} header={header()} className='mt-4' />}     
                        </section>                        
                    </div>                    
                </div>
            </div>

        </div>
    );
}

export default transition(SaisieMairie);