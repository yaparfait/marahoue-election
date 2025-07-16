import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import MenuGeneral from "./MenuGeneral";
import { BreadCrumb } from 'primereact/breadcrumb';
import MenuParamItems from "./MenuParamItems.js";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { getLieuVote, createLieuVote, updateLieuVote, deleteLieuVote } from "../services/LieuvoteService";
import { getDepartements } from "../services/DeptService";
import { getSprefComByDepartement } from "../services/SprefComService";
import { motion } from 'framer-motion';

function CentreVote() {
    const items = [{ label: 'Application' }, { label: 'Paramétrage' }, { label: 'Lieux de vote' }];
    const home = { icon: 'pi pi-home', url: '/accueil' }
    let emptyLieu = {
        idlieuvote: null,
        liblieuvote: '',
        idlocalite: '',
        nbreinscrit: 0,
        nbBureauvote: 1
    };
    const depts = useRef([]);
    const toast = useRef(null);
    const [lieuxvote, setLieuxvote] = useState([]);
    const [lieuDialog, setLieuDialog] = useState(false);
    const [updateLieuxDialog, setUpdateLieuxDialog] = useState(false);
    const [deleteLieuxDialog, setDeleteLieuxDialog] = useState(false);
    const [lieuvote, setLieuvote] = useState(emptyLieu);
    const [selectedLieux, setSelectedLieux] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedDept, setSelectedDept] = useState(null);
    const [selectedLocalite, setSelectedLocalite] = useState(null);
    const [localites, setLocalites] = useState([]);

    useEffect(() => {
        getLieuVote().then(data => setLieuxvote(data));
        getDepartements().then(data => depts.current = data);
    }, [])

    const openNew = () => {
        setLieuvote(emptyLieu);
        setSubmitted(false);
        setLieuDialog(true);
    };

    const openUpdate = () => {
        //setSubmitted(false);
        setUpdateLieuxDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setLieuDialog(false);
    };

    const hideDeleteLieuxDialog = () => {
        setDeleteLieuxDialog(false);
    };

    const hideUpdateLieuxDialog = () => {
        setUpdateLieuxDialog(false);
        setSelectedLieux(null);
        getLieuVote().then(data => setLieuxvote(data));
    };

    const confirmDeleteSelected = () => {
        setDeleteLieuxDialog(true);
    };

    const deleteSelectedLieux = () => {

        selectedLieux.forEach(l => {
            deleteLieuVote(l.idlieuvote).then(data => {
                data.status === 200 ? toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Supprimer ' + l.liblieuvote + ' : ' + data.message, life: 3000 }) :
                                      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Supprimer ' + l.liblieuvote + ' : ' + data.message, life: 3000 });
                getLieuVote().then(data => setLieuxvote(data));
            })
        });
        setDeleteLieuxDialog(false);
        setSelectedLieux(null);
        //getLieuVote().then(data => setLieuxvote(data));
    };

    const saveLieuVote = () => {
        setSubmitted(true);
        //setLieuDialog(false);
        if (lieuvote.liblieuvote.trim()) {
            createLieuVote(lieuvote).then(data => {
                data.status === 200 ? toast.current.show({ severity: 'success', summary: 'Succès', detail: data.message, life: 3000 }) :
                                      toast.current.show({ severity: 'error', summary: 'Erreur', detail: data.message, life: 3000 });
                getLieuVote().then(data => setLieuxvote(data));
            })
            setSelectedDept(null);
            setSelectedLocalite(null);
            setLieuvote(emptyLieu);
            setLieuDialog(false);
            //getLieuVote().then(data => setLieuxvote(data));
        }
    }

    const updateSelectedLieux = () => {
        setSubmitted(true);

        selectedLieux.forEach(l =>{
            updateLieuVote(l).then(data => {
                data.status === 200 ? toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Modifier ' + l.liblieuvote + ' : ' + data.message, life: 3000 }) :
                                      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Modifier ' + l.liblieuvote + ' : ' + data.message, life: 3000 });
                //getLieuVote().then(data => setLieuxvote(data));
            })        
        })
        setUpdateLieuxDialog(false);
        setSelectedLieux(null);
        getLieuVote().then(data => setLieuxvote(data));

    }

    const onDepartementChange = (e) => {
        setSelectedDept(e.value);
        getSprefComByDepartement(e.value.iddept).then(data => setLocalites(data));
    }

    const onLocaliteChange = (e) => {
        const val = (e && e.value) || '';
        let _lieuvote = { ...lieuvote };
        _lieuvote['idlocalite'] = val.idsprefcom;
        setLieuvote(_lieuvote);
        setSelectedLocalite(val);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _lieuvote = { ...lieuvote };
        _lieuvote[`${name}`] = val;

        setLieuvote(_lieuvote);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _lieuvote = { ...lieuvote };

        _lieuvote[`${name}`] = val;

        setLieuvote(_lieuvote);
    };

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
            case 'nbreinscrit':
                if (isPositiveInteger(newValue)) rowData[field] = newValue;
                else event.preventDefault();
                break;

            default:
                if (newValue.trim().length > 0) rowData[field] = newValue;
                else event.preventDefault();
                break;
        }
    };

    const cellEditor = (options) => {
        if (options.field === 'nbreinscrit') return numberEditor(options);
        else return textEditor(options);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const numberEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} />;
    };
/*
    const localiteBodyTemplate = (rowData) => {
        return rowData.libsprefcom + ' | ' + rowData.idsprefcom;
    };
*/
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Nouveau" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Modifier" icon="pi pi-pen" severity="warning" onClick={openUpdate} disabled={!selectedLieux || !selectedLieux.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Supprimer" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedLieux || !selectedLieux.length} />;
    };

    const lieuDialogFooter = (
        <React.Fragment>
            <Button label="Annuler" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Enregistrer" icon="pi pi-check" onClick={saveLieuVote} />
        </React.Fragment>
    );

    const deleteLieuxDialogFooter = (
        <React.Fragment>
            <Button label="Non" icon="pi pi-times" outlined onClick={hideDeleteLieuxDialog} />
            <Button label="Oui" icon="pi pi-check" severity="danger" onClick={deleteSelectedLieux} />
        </React.Fragment>
    );

    const updateLieuxDialogFooter = (
        <React.Fragment>
            <Button label="Annuler" icon="pi pi-times" outlined onClick={hideUpdateLieuxDialog} />
            <Button label="Enregistrer" icon="pi pi-check" onClick={updateSelectedLieux} />
        </React.Fragment>
    );

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
                            <div className="text-6xl text-primary font-bold mb-3">Lieux de vote</div>
                            <Toolbar className="mb-3 p-2" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
                            <DataTable value={lieuxvote} dataKey='idlieuvote' selectionMode='checkbox' selection={selectedLieux} onSelectionChange={(e) => setSelectedLieux(e.value)} showGridlines stripedRows tableStyle={{ minWidth: '50rem' }}>
                                <Column selectionMode="multiple"></Column>
                                <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                                <Column field="idlieuvote" header="Id"></Column>
                                <Column field="liblieuvote" header="Nom"></Column>
                                <Column field="nbreinscrit" header="Population inscrite"></Column>
                                <Column field="nbrebv" header="Nbre de BV"></Column>
                                <Column field="libsprefcom" header="Localité"></Column>
                            </DataTable>
                        </section>
                    </motion.div>
                </div>
            </div>

            <Dialog visible={lieuDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Ajouter un nouveau lieu de vote" modal className="p-fluid" footer={lieuDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nom du lieu de vote
                    </label>
                    <InputText id="name" value={lieuvote.liblieuvote} onChange={(e) => onInputChange(e, 'liblieuvote')} required autoFocus className={classNames({ 'p-invalid': submitted && !lieuvote.liblieuvote })} />
                    {submitted && !lieuvote.liblieuvote && <small className="p-error">Le nom du lieu de vote est requis</small>}
                </div>
                <div className="field">
                    <label htmlFor="nbrebureau" className="font-bold">
                        Nombre de bureaux de vote
                    </label>
                    <InputNumber id="nbrebureau" value={lieuvote.nbBureauvote} onValueChange={(e) => onInputNumberChange(e, 'nbBureauvote')} />
                </div>
                <div className="field">
                    <label htmlFor="nbreinscrit" className="font-bold">
                        Population inscrite
                    </label>
                    <InputNumber id="nbreinscrit" value={lieuvote.nbreinscrit} onValueChange={(e) => onInputNumberChange(e, 'nbreinscrit')} />
                </div>
                <div className="field">
                    <label className="font-bold">
                        Localité
                    </label>
                    <Dropdown value={selectedDept} onChange={(e) => onDepartementChange(e)} options={depts.current} optionLabel="libdept"
                        placeholder="Selectionner un departement" className="w-full" />
                    <Dropdown value={selectedLocalite} onChange={(e) => onLocaliteChange(e)} options={localites} optionLabel="libsprefcom"
                        placeholder="Selectionner la localité" className="w-full mt-2" />
                </div>
            </Dialog>
            <Dialog visible={updateLieuxDialog} style={{ width: '60rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Mise à jour des lieux de vote" modal footer={updateLieuxDialogFooter} onHide={hideUpdateLieuxDialog}>
                <DataTable value={selectedLieux} editMode="cell" showGridlines stripedRows tableStyle={{ minWidth: '50rem' }} >
                    <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                    <Column field="idlieuvote" header="Id"></Column>
                    <Column field="liblieuvote" header="Nom" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
                    <Column field="nbreinscrit" header="Population inscrite" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
                </DataTable>
            </Dialog>
            <Dialog visible={deleteLieuxDialog} style={{ width: '36rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmation" modal footer={deleteLieuxDialogFooter} onHide={hideDeleteLieuxDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {lieuvote && <span>Voulez-vous supprimer tous les lieux de votes selectionnés?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default CentreVote;