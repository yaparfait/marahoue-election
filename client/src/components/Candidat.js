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
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { getCandidats, createCandidat, updateCandidat, deleteCandidat, getAllCivilites } from "../services/CandidatService.js";
import { getAllPartiPolitics } from "../services/PartiService.js";
import { motion } from 'framer-motion';

function Candidat() {
    const items = [{ label: 'Application' }, { label: 'Paramétrage' }, { label: 'Candidat' }];
    const home = { icon: 'pi pi-home', url: '/accueil' }
    let emptyCandidat = {
        idcand: null, 
        nomcand: '', 
        nomusuel: '', 
        nomliste: '', 
        idcivilite: '', 
        idparti: ''
    };
    const partis = useRef([]);
    const civilites = useRef([]);
    const toast = useRef(null);
    const [dialogHeader, setDialogHeader] = useState('');
    const [candidats, setCandidats] = useState([]);
    const [candidat, setCandidat] = useState(emptyCandidat);
    const [candDialog, setCandDialog] = useState(false);
    const [deleteCandDialog, setDeleteCandDialog] = useState(false);
    const [deleteCandsDialog, setDeleteCandsDialog] = useState(false);
    const [selectedCands, setSelectedCands] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedCivilite, setSelectedCivilite] = useState(null);
    const [selectedParti, setSelectedParti] = useState(null);

    useEffect(() => {
        getCandidats().then(data => setCandidats(data));
        getAllPartiPolitics().then(data => partis.current = data);
        getAllCivilites().then(data => civilites.current = data);
    }, [])

    const openNew = () => {
        setCandidat(emptyCandidat);
        setDialogHeader("Ajouter un nouveau candidat");
        setSubmitted(false);
        setCandDialog(true);
    };

    const editCandidat = (candidat) => {
        setDialogHeader("Modifier les informations du candidat");
        setCandidat(candidat);
        setSelectedCivilite({idcivilite: candidat.idcivilite, libcivilite: candidat.libcivilite, libcourt: candidat.libcourt});
        setSelectedParti({idparti: candidat.idparti, libparti: candidat.libparti, sigle: candidat.sigle});
        setCandDialog(true);
    };

    const confirmDeleteCandidat = (candidat) => {
        setCandidat(candidat);
        setDeleteCandDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCandDialog(false);
        setSelectedCivilite(null);
        setSelectedParti(null);
    };

    const hideDeleteCandDialog = () => {
        setDeleteCandDialog(false);
    };

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
                getCandidats().then(data => setCandidats(data));
            })
        });
        setDeleteCandsDialog(false);
        setSelectedCands(null);
    };

    const deleteSelectedCand = () => {

            deleteCandidat(candidat.idcand).then(data => {
                data.status === 200 ? toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Supprimer ' + candidat.nomcand + ' : ' + data.message, life: 3000 }) :
                                      toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Supprimer ' + candidat.nomcand + ' : ' + data.message, life: 3000 });
                getCandidats().then(data => setCandidats(data));
            })
        setDeleteCandDialog(false);
        setCandidat(null);
    };

    const saveCandidat = () => {
        setSubmitted(true);
        if (candidat.nomcand.trim() && candidat.nomusuel.trim()) {
            if (!candidat.idcand){
            createCandidat(candidat).then(data => {
                data.status === 200 ? toast.current.show({ severity: 'success', summary: 'Succès', detail: data.message, life: 3000 }) :
                                      toast.current.show({ severity: 'error', summary: 'Erreur', detail: data.message, life: 3000 });
                getCandidats().then(data => setCandidats(data));

            })} else {
                updateCandidat(candidat).then(data => {
                    data.status === 200 ? toast.current.show({ severity: 'success', summary: 'Succès', detail: 'Modifier ' + candidat.nomcand + ' : ' + data.message, life: 3000 }) :
                                          toast.current.show({ severity: 'error', summary: 'Erreur', detail: 'Modifier ' + candidat.nomcand + ' : ' + data.message, life: 3000 });
                })  
            }

            selectedCivilite(null);
            selectedParti(null);
            setCandidat(emptyCandidat);
            setCandDialog(false);
            getCandidats().then(data => setCandidats(data));
        }
    }

    const onPartiChange = (e) => {
        const val = (e && e.value) || '';
        let _candidat = { ...candidat };
        _candidat['idparti'] = val.idparti;
        setCandidat(_candidat);
        setSelectedParti(val);
    }

    const onCiviliteChange = (e) => {
        const val = (e && e.value) || '';
        let _candidat = { ...candidat };
        _candidat['idlocalite'] = val.idcivilite;
        setCandidat(_candidat);
        setSelectedCivilite(val);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _candidat = { ...candidat };
        _candidat[`${name}`] = val;

        setCandidat(_candidat);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editCandidat(rowData)} title="Modifier" />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteCandidat(rowData)} title="Supprimer" />
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Nouveau" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Supprimer" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedCands || !selectedCands.length} />;
    };

    const candDialogFooter = (
        <React.Fragment>
            <Button label="Annuler" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Enregistrer" icon="pi pi-check" onClick={saveCandidat} />
        </React.Fragment>
    );

    const deleteCandDialogFooter = (
        <React.Fragment>
            <Button label="Non" icon="pi pi-times" outlined onClick={hideDeleteCandDialog} />
            <Button label="Oui" icon="pi pi-check" severity="danger" onClick={deleteSelectedCand} />
        </React.Fragment>
    );

    const deleteCandsDialogFooter = (
        <React.Fragment>
            <Button label="Non" icon="pi pi-times" outlined onClick={hideDeleteCandsDialog} />
            <Button label="Oui" icon="pi pi-check" severity="danger" onClick={deleteSelectedCands} />
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
                            <div className="text-6xl text-primary font-bold mb-3">Candidats</div>
                            <Toolbar className="mb-3 p-2" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
                            <DataTable value={candidats} dataKey='idcand' selectionMode='checkbox' selection={selectedCands} onSelectionChange={(e) => setSelectedCands(e.value)} showGridlines stripedRows tableStyle={{ minWidth: '50rem' }}>
                                <Column selectionMode="multiple"></Column>
                                <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                                <Column field="idcand" header="Id"></Column>
                                <Column field="nomcand" header="Nom du Candidat"></Column>
                                <Column field="nomusuel" header="Nom usuel"></Column>
                                <Column field="nomliste" header="Nom de liste"></Column>
                                <Column field="libparti" header="Parti Politique"></Column>
                                <Column header="Action" body={actionBodyTemplate} exportable={false} style={{ minWidth: '10rem', textAlign: 'center' }}></Column>
                            </DataTable>
                        </section>
                    </motion.div>
                </div>
            </div>

            <Dialog visible={candDialog} style={{ width: '38rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header={dialogHeader} modal className="p-fluid" footer={candDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="civilite" className="font-bold">
                        Civilité
                    </label>
                    <Dropdown value={selectedCivilite} onChange={(e) => onCiviliteChange(e)} options={civilites.current} optionLabel="libcivilite"
                        placeholder="Selectionner une civilité" className="w-full" />
                </div>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nom complet du candidat
                    </label>
                    <InputText id="name" value={candidat.nomcand} onChange={(e) => onInputChange(e, 'nomcand')} required autoFocus className={classNames({ 'p-invalid': submitted && !candidat.nomcand })} />
                    {submitted && !candidat.nomcand && <small className="p-error">Le nom complet du candidat est obligatoire</small>}
                </div>
                <div className="field">
                    <label htmlFor="usuel" className="font-bold">
                        Nom usuel du candidat
                    </label>
                    <InputText id="usuel" value={candidat.nomusuel} onChange={(e) => onInputChange(e, 'nomusuel')} required className={classNames({ 'p-invalid': submitted && !candidat.nomusuel })} />
                    {submitted && !candidat.nomusuel && <small className="p-error">Le nom usuel du candidat est obligatoire</small>}
                </div>
                <div className="field">
                    <label htmlFor="nomliste" className="font-bold">
                        Nom de la liste
                    </label>
                    <InputText id="nomliste" value={candidat.nomliste} onChange={(e) => onInputChange(e, 'nomliste')} />
                </div>
                <div className="field">
                    <label className="font-bold">
                        Parti politique
                    </label>
                    <Dropdown value={selectedParti} onChange={(e) => onPartiChange(e)} options={partis.current} optionLabel="libparti"
                        placeholder="Selectionner un parti politique" className="w-full" />
                </div>
            </Dialog>
            <Dialog visible={deleteCandDialog} style={{ width: '36rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmation" modal footer={deleteCandDialogFooter} onHide={hideDeleteCandDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {candidat && (
                        <span>
                            Êtes-vous sûrs de vouloir supprimer le candidat <b>{candidat.nomcand}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
            <Dialog visible={deleteCandsDialog} style={{ width: '36rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmation" modal footer={deleteCandsDialogFooter} onHide={hideDeleteCandsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {candidat && <span>Voulez-vous supprimer tous les candidats selectionnés?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default Candidat;