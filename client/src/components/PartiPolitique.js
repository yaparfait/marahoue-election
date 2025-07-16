import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useState, useEffect } from 'react';
import MenuGeneral from "./MenuGeneral.js";
import { BreadCrumb } from 'primereact/breadcrumb';
import MenuParamItems from "./MenuParamItems.js";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getAllPartiPolitics } from "../services/PartiService.js";
import { motion } from 'framer-motion';

function Departement() {
    const [partis, setPartis] = useState([]);
    const items = [{ label: 'Application' }, { label: 'Paramétrage' }, { label: 'Partis politiques' }];
    const home = { icon: 'pi pi-home', url: '/accueil' }

    useEffect(() =>{
        getAllPartiPolitics().then(data => setPartis(data));
    }, [])

    return (
        <div>
            <MenuGeneral />

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
                            <div className="text-6xl text-primary font-bold mb-3">Partis politiques</div>
                            <DataTable value={partis} showGridlines stripedRows tableStyle={{ minWidth: '50rem' }}>
                                <Column field="idparti" header="Id"></Column>
                                <Column field="libparti" header="Nom"></Column>
                                <Column field="sigle" header="Sigle"></Column>
                            </DataTable>
                        </section>
                    </motion.div>

                </div>
            </div>

        </div>
    );
}

export default Departement;