import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { useState, useEffect } from 'react';
import MenuGeneral from "./MenuGeneral";
import { BreadCrumb } from 'primereact/breadcrumb';
import MenuParamItems from "./MenuParamItems.js";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getSprefCommune } from "../services/SprefComService";
import { motion } from 'framer-motion';
//const  sprefComService  = require("../services/SprefComService.js");

function SousprefCommune() {
    const [sprefs, setSprefs] = useState([]);
    const items = [{ label: 'Application' }, { label: 'Departements' }];
    const home = { icon: 'pi pi-home', url: '/accueil' }

    useEffect(() =>{
        getSprefCommune().then(data => setSprefs(data));
    }, []);

    const getLocaliteType = (rowData) => {
        //alert(rowData.spref)
        switch (rowData.spref) {
            case 1:
                return 'Sous-Prefecture';

            case 0:
                return 'Commune';
            
            default :
                return 'Commune';
        }
    };

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
                            <div className="text-6xl text-primary font-bold mb-3">Communes et Sous-Prefectures</div>
                            <DataTable value={sprefs} showGridlines stripedRows tableStyle={{ minWidth: '50rem' }}>
                                <Column field="idsprefcom" header="Id"></Column>
                                <Column field="libsprefcom" header="Nom"></Column>
                                <Column field="spref" header="Type Circonscription" body={getLocaliteType}></Column>
                                <Column field="libdept" header="Departement"></Column>
                            </DataTable>
                        </section>
                    </motion.div>
                </div>
            </div>

        </div>
    );
}

export default SousprefCommune;