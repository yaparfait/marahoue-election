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
//import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PublicIcon from '@mui/icons-material/Public';

const lieuxService = require("../services/LieuvoteService.js");
const voterService = require("../services/VoterService.js");

function SaisieMairie() {

    const items = [{ label: 'Application' }, { label: 'Saisie des votes' }];
    const home = { icon: 'pi pi-home', url: '/accueil' }
    const [lieuItems, setLieuItems] = useState([]);
    const [selectedLieu, setSelectedLieu] = useState(null);
    const [popInscrit, setPopInscrit] = useState(null);
    const [optionItems, setOptionItems] = useState([]);
    const [votesBureau, setVotesBureau] = useState([]);
    const [selectValue, setSelectValue] = useState(null);
    const toast = useRef(null);
   
    useEffect(() => {   
        lieuxService.getLieuVoteCommuneBouafle().then(data => {       
            setLieuItems(data);
            //alert(lieuxvote)
        })
    }, [])
    
    const handleClick = (e, id, name, nbreinscrit) => {
        //alert(name)
        setSelectedLieu(name);
        setPopInscrit(nbreinscrit);
        e.preventDefault();
        window.scrollTo({
            top: document.querySelector("#filAriane").offsetTop,
            behavior: "smooth",
        }); 
        lieuxService.getBureauVoteByLieu(id).then(data => {
            let bureauvote = data.map(b => `{"name": "${b.libbv}", "value": "${b.idbv}"}`);
            let jsonString = '[' + bureauvote + ']';
            let jsonObject = JSON.parse(jsonString);
            setOptionItems(jsonObject);
            jsonObject && setSelectValue(jsonObject[0].value);
            jsonObject && voterService.getVoteByBureauMairie(jsonObject[0].value).then(data => setVotesBureau(data));
        })
    }

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
        voterService.updateVote(rowData).then(data => {
            data.status === 200 ? toast.current.show({ severity: 'success', summary: 'Saisie de vote', detail: rowData.score + ' point(s) saisis pour le candidat ' + rowData.nomcand, life: 3000 }) :
                                  toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Votre saisie n\'a pas pu être enregistrée', life: 3000 });
        })
    };
    const onValueChange = (newValue) => {
        setSelectValue(newValue);
        newValue ? voterService.getVoteByBureauMairie(newValue).then(data => setVotesBureau(data)) : setVotesBureau(null);
    }

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
            <div className="flex flex-wrap gap-2">
                <label htmlFor="name" className="font-bold">Population electorale :</label>
                <label htmlFor="name" className="font-bold text-red-600">{popInscrit}</label>
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
                            {selectedLieu && <div className="text-6xl text-green-700 font-bold mb-3">Lieu de vote : {selectedLieu}</div>}
                            
                            <Toolbar className="mb-3 p-2" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                            <DataTable value={votesBureau} editMode="cell" showGridlines stripedRows tableStyle={{ minWidth: '50rem' }} >
                                {/*<Column field="idvote" header="Id"></Column>*/}
                                <Column field="sigle" header="Parti" ></Column>
                                <Column field="nomcand" header="Candidat" ></Column>
                                <Column field="nomliste" header="Liste" ></Column>
                                <Column field="score" header="Score" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
                            </DataTable>      
                        </section>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SaisieMairie;