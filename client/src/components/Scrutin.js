import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import MenuGeneral from "./MenuGeneral.js";
import { BreadCrumb } from 'primereact/breadcrumb';
import MenuParamItems from "./MenuParamItems.js";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { getCandidats } from "../services/CandidatService.js";
import { getAllScrutins, getScrutinsWithCands, createScrutin, updateScrutin, deleteScrutin } from "../services/ScrutinService.js";
import { motion } from 'framer-motion';
import { envergureList } from '../datas/EnvergureList.js';

function Scrutin() {
    const items = [{ label: 'Application' }, { label: 'Paramétrage' }, { label: 'Scrutins' }];
    const home = { icon: 'pi pi-home', url: '/accueil' }
    const options = envergureList.map(envergure => ({label: envergure, value: envergure}));
    let emptyScrutin = {
        idscrutin: null, 
        libscrutin: '', 
        envergure: ''
    };
    let emptyCandidat = {
        idcand: null, 
        idparticipe: null, 
        idscrutin: null, 
        idparti: null,
        idcirconscription: null,
        nomliste: '', 
        priorite: 0   
    };
    const [expandedRows, setExpandedRows] = useState(null);
    const [scrutinsCandidats, setScrutinsCandidats] = useState(null);
    const toast = useRef(null);
    const [dialogHeader, setDialogHeader] = useState('');
    const [candidat, setCandidat] = useState(emptyCandidat);
    const [candidats, setCandidats] = useState([]);
    const [scrutin, setScrutin] = useState(emptyScrutin);
    const [scrutinDialog, setScrutinDialog] = useState(false);
    const [candidatDialog, setCandidatDialog] = useState(false);
    const [deleteScrutinDialog, setDeleteScrutinDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        getScrutinsWithCands().then(data => {
            transformData(data);
        });
            
    }, [])

    const transformData = (data) => {
        let transformedData = [];      
        // Parcours des données originales
        data.forEach(item => {
            // Vérifie si un scrutin avec le même id existe déjà dans les résultats transformés
            let existingItem = transformedData.find(s => s.idscrutin === item.idscrutin);
            
            if (existingItem) {
                // Si le scrutin existe déjà, ajoute simplement le candidat à sa liste de candidats
                existingItem.candidats.push({
                    idparticipe: item.idparticipe,
                    idcivilite: item.idcivilite,
                    libcivilite: item.libcivilite,
                    idcand: item.idcand,
                    nomcand: item.nomcand,
                    nomusuel: item.nomusuel,
                    nomliste: item.nomliste,
                    priorite: item.priorite,
                    idparti: item.idparti,
                    libparti: item.libparti,
                    sigle: item.sigle
                });
            } else {
                // Si le scrutin n'existe pas encore, crée un nouvel objet de scrutin avec une liste de candidats contenant le candidat actuel
                transformedData.push({
                    idscrutin: item.idscrutin,
                    libscrutin: item.libscrutin,
                    envergure: item.envergure,
                    candidats: [{
                        idparticipe: item.idparticipe,
                        idcivilite: item.idcivilite,
                        libcivilite: item.libcivilite,
                        idcand: item.idcand,
                        nomcand: item.nomcand,
                        nomusuel: item.nomusuel,
                        nomliste: item.nomliste,
                        priorite: item.priorite,
                        idparti: item.idparti,
                        libparti: item.libparti,
                        sigle: item.sigle, 
                    }]
                });
            }
        });             
        // Maintenant, transformedData contient les données au format requis
        setScrutinsCandidats(transformedData);          
    }

    const openNew = () => {
        setScrutin(emptyScrutin);
        setDialogHeader("Ajouter un nouveau scrutin");
        setSubmitted(false);
        setScrutinDialog(true);
    };

    const openCandidatDialog = (scrutinCandidat) => {
        setDialogHeader("Ajouter un candidat au scrutin");
        setScrutin({idscrutin: scrutinCandidat.idscrutin, libscrutin: scrutinCandidat.libscrutin, envergure: scrutinCandidat.envergure});
        setCandidatDialog(true);
    };

    const editScrutin = (scrutinCandidat) => {
        setDialogHeader("Modifier les informations du scrutin");
        setScrutin({idscrutin: scrutinCandidat.idscrutin, libscrutin: scrutinCandidat.libscrutin, envergure: scrutinCandidat.envergure});
        setScrutinDialog(true);
    };

    const confirmDeleteScrutin = (scrutinCandidat) => {
        setScrutin({idscrutin: scrutinCandidat.idscrutin, libscrutin: scrutinCandidat.libscrutin, envergure: scrutinCandidat.envergure});
        setDeleteScrutinDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setScrutinDialog(false);
        setCandidatDialog(false);
    };

    const hideDeleteScrutinDialog = () => {
        setDeleteScrutinDialog(false);
    };
/*
    const hideDeleteCandsDialog = () => {
        setDeleteCandsDialog(false);
    };

    const confirmDeleteSelected = () => {
        setDeleteCandsDialog(true);
    };

    const deleteSelectedCands = () => {

        selectedCands.forEach(c => {
            deleteCandidat(c.idcand).then(data => {
                data.status === 200 ? toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Supprimer ' + c.nomcand + ' : ' + data.message, life: 3000 }) :
                                      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Supprimer ' + c.nomcand + ' : ' + data.message, life: 3000 });
                //getCandidats().then(data => setCandidats(data));
            })
        });
        setDeleteCandsDialog(false);
        setSelectedCands(null);
    };
*/
    const deleteSelectedScrutin = () => {

        deleteScrutin(scrutin.idscrutin).then(data => {
            data.status === 200 ? toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Supprimer ' + scrutin.libscrutin + ' : ' + data.message, life: 3000 }) :
                                  toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Supprimer ' + scrutin.libscrutin + ' : ' + data.message, life: 3000 });                                   
        })
        setDeleteScrutinDialog(false);
        setScrutin(emptyScrutin); 
        getScrutinsWithCands().then(data => {
            transformData(data);
        }); 
    };

    const saveScrutin = () => {
        setSubmitted(true);
        if (scrutin.libscrutin.trim()) {
            if (!scrutin.idscrutin){
                createScrutin(scrutin).then(data => {
                    data.status === 200 ? toast.current.show({ severity: 'success', summary: 'Succès', detail: data.message, life: 3000 }) :
                                        toast.current.show({ severity: 'error', summary: 'Erreur', detail: data.message, life: 3000 });
                })
            } else {
                updateScrutin(scrutin).then(data => {
                    data.status === 200 ? toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Modifier ' + scrutin.libscrutin + ' : ' + data.message, life: 3000 }) :
                                          toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Modifier ' + scrutin.libscrutin + ' : ' + data.message, life: 3000 });
                })  
            }
            setScrutin(emptyScrutin);
            setScrutinDialog(false);
            getScrutinsWithCands().then(data => {
                transformData(data);
            });
        }
    }

    const candidatScrutin = () => {
        setSubmitted(true);
        /*
        if (scrutin.libscrutin.trim()) {
            if (!scrutin.idscrutin){
                createScrutin(scrutin).then(data => {
                    data.status === 200 ? toast.current.show({ severity: 'success', summary: 'Succès', detail: data.message, life: 3000 }) :
                                        toast.current.show({ severity: 'error', summary: 'Erreur', detail: data.message, life: 3000 });
                })
            } else {
                updateScrutin(scrutin).then(data => {
                    data.status === 200 ? toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Modifier ' + scrutin.libscrutin + ' : ' + data.message, life: 3000 }) :
                                          toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Modifier ' + scrutin.libscrutin + ' : ' + data.message, life: 3000 });
                })  
            }
            setScrutin(emptyScrutin);
            setScrutinDialog(false);
            getScrutinsWithCands().then(data => {
                transformData(data);
            });
        }
        */
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

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _scrutin = { ...scrutin };
        _scrutin[`${name}`] = val;

        setScrutin(_scrutin);
    };

    const onCandInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _candidat = { ...candidat };
        switch (name) {
            case 'priorite':
                if (isPositiveInteger(val)) _candidat[`${name}`] = val;;
                break;

            default:
                _candidat[`${name}`] = val;
                break;
        }

        setCandidat(_candidat);
    };

    const expandAll = () => {
        let _expandedRows = {};

        scrutinsCandidats.forEach((s) => (_expandedRows[`${s.idscrutin}`] = true));

        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-plus" rounded outlined severity="success" className="mr-2" onClick={() => openCandidatDialog(rowData)} title="Ajouter les candidats" />
                <Button icon="pi pi-pencil" rounded outlined severity="warning" className="mr-2" onClick={() => editScrutin(rowData)} title="Modifier" />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteScrutin(rowData)} title="Supprimer" />
            </React.Fragment>
        );
    };

    const actionExpandBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" severity="warning" title="Modifier" />
                <Button icon="pi pi-trash" rounded outlined severity="danger" title="Supprimer" />
            </React.Fragment>
        );
    };

    const rowExpansionTemplate = (rowData) => {
        return (
            <div>
                <h5>Liste des candidats {rowData.libscrutin}</h5>
                <DataTable value={rowData.candidats} showGridlines stripedRows size='small'>
                    <Column field="idcand" header="Id"></Column>
                    <Column field="nomcand" header="Nom du candidat" sortable></Column>
                    <Column field="nomusuel" header="Nom usuel" sortable></Column>
                    <Column field="nomliste" header="Nom de la liste"></Column>
                    <Column field="sigle" header="Parti politique"></Column>
                    <Column field="priorite" header="Ordre" sortable></Column>
                    <Column header="Retirer" body={actionExpandBodyTemplate} style={{ minWidth: '10rem', textAlign: 'center' }}></Column>
                </DataTable>
            </div>
        );
    };

    const allowExpansion = (rowData) => {
        return rowData.candidats.length > 0;
    };

    const header = (
        <div className="flex justify-content-between">
            <Button label="Nouveau" icon="pi pi-plus" severity="success" onClick={openNew} />
            <span>
                <Button icon="pi pi-plus" label="Etendre tout" className="mr-2" onClick={expandAll} text />
                <Button icon="pi pi-minus" label="Retracter Tout" onClick={collapseAll} text />
            </span>
        </div>
    );

    const scrutinDialogFooter = (
        <React.Fragment>
            <Button label="Annuler" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Enregistrer" icon="pi pi-check" onClick={saveScrutin} />
        </React.Fragment>
    );

    const deleteScrutinDialogFooter = (
        <React.Fragment>
            <Button label="Non" icon="pi pi-times" outlined onClick={hideDeleteScrutinDialog} />
            <Button label="Oui" icon="pi pi-check" severity="danger" onClick={deleteSelectedScrutin} />
        </React.Fragment>
    );

    const candDialogFooter = (
        <React.Fragment>
            <Button label="Annuler" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Enregistrer" icon="pi pi-check" onClick={candidatScrutin} />
        </React.Fragment>
    );
/*
    const deleteCandsDialogFooter = (
        <React.Fragment>
            <Button label="Non" icon="pi pi-times" outlined onClick={hideDeleteCandsDialog} />
            <Button label="Oui" icon="pi pi-check" severity="danger" onClick={deleteSelectedCands} />
        </React.Fragment>
    );
*/
    return (
        <div>
            <MenuGeneral />
            <Toast ref={toast} />
            <div class="grid">
                <div class="col-fixed" style={{ width: '300px' }}>
                    <div className="col-12 p-2 text-center md:text-left flex align-items-center surface-0 text-800 shadow-4">
                        <MenuParamItems />
                    </div>
                </div>
                <div class="col">
                    <BreadCrumb model={items} home={home} className="filAriane" />
                    <motion.div className="col-12 p-4 text-center md:text-left flex align-items-center surface-0 text-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1}}>
                        <section>
                            <div className="text-6xl text-primary font-bold mb-3">Scrutins</div>
                            <DataTable value={scrutinsCandidats} dataKey='idscrutin' header={header} 
                                        expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={rowExpansionTemplate}
                                        stripedRows tableStyle={{ minWidth: '60rem'}}>
                                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                                <Column field="idscrutin" header="Id"></Column>
                                <Column field="libscrutin" header="Libellé"></Column>
                                <Column field="envergure" header="Envergure"></Column>
                                <Column header="Action" body={actionBodyTemplate} ></Column>
                            </DataTable>
                        </section>
                    </motion.div>
                </div>
            </div>

            <Dialog visible={scrutinDialog} style={{ width: '38rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header={dialogHeader} modal className="p-fluid" footer={scrutinDialogFooter} onHide={hideDialog}>               
                <div className="field">
                    <label htmlFor="libelle" className="font-bold">
                        Libellé
                    </label>
                    <InputText id="libelle" value={scrutin.libscrutin} onChange={(e) => onInputChange(e, 'libscrutin')} required autoFocus className={classNames({ 'p-invalid': submitted && !scrutin.libscrutin })} />
                    {submitted && !scrutin.libscrutin && <small className="p-error">Le libellé est obligatoire</small>}
                </div>
                <div className="field">
                    <label htmlFor="envergure" className="font-bold">
                        Envergure
                    </label>
                    <Dropdown id="envergure" value={scrutin.envergure} onChange={(e) => onInputChange(e, 'envergure')} options={options} 
                        placeholder="Selectionner l'envergure du scrutin" className="w-full" />
                </div>    
            </Dialog>
            <Dialog visible={candidatDialog} style={{ width: '38rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header={dialogHeader} modal className="p-fluid" footer={candDialogFooter} onHide={hideDialog}>               
                <div className="field">
                    <label htmlFor="candidat" className="font-bold">
                        Candidat
                    </label>
                    <Dropdown id="candidat" value={candidat.idcand} onChange={(e) => onCandInputChange(e, 'idcand')} options={options} required autoFocus className={classNames({ 'p-invalid': submitted && !candidat.idcand })}
                        placeholder="Selectionner le candidat" />
                    {submitted && !candidat.idcand && <small className="p-error">Le candidat est obligatoire</small>}
                </div> 
                <div className="field">
                    <label htmlFor="parti" className="font-bold">
                        Parti politique
                    </label>
                    <Dropdown id="parti" value={candidat.idparti} onChange={(e) => onCandInputChange(e, 'idparti')} options={options} 
                        placeholder="Selectionner l'envergure du scrutin" className="w-full" />
                </div>     
                <div className="field">
                    <label htmlFor="liste" className="font-bold">
                        Nom de liste
                    </label>
                    <InputText id="liste" value={candidat.nomliste} onChange={(e) => onCandInputChange(e, 'nomliste')}  />
                </div> 
                <div className="field">
                    <label htmlFor="priorite" className="font-bold">
                        Priorité
                    </label>
                    <InputNumber value={candidat.priorite} onValueChange={(e) => onCandInputChange(e, 'priorite')} />
                </div>                 
            </Dialog>
            <Dialog visible={deleteScrutinDialog} style={{ width: '36rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmation" modal footer={deleteScrutinDialogFooter} onHide={hideDeleteScrutinDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {scrutin && (<span>Êtes-vous sûrs de vouloir supprimer le scrutin <b>{scrutin.libscrutin}</b>?</span>)}
                </div>
            </Dialog>          
        </div>
    );
}

export default Scrutin;