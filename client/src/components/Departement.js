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

const  deptService  = require("../services/DeptService.js");

function Departement() {
    const [depts, setDepts] = useState([]);
    const items = [{ label: 'Application' }, { label: 'Departements' }];
    const home = { icon: 'pi pi-home', url: '/accueil' }

    useEffect(() =>{
        deptService.getDepartements().then(data => setDepts(data));
    }, [])

    const regionBodyTemplate = (rowData) => {
        return rowData.libregion + ' | ' + rowData.idregion;
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
                    <div className="col-12 p-4 text-center md:text-left flex align-items-center surface-0 text-800">
                        <section>
                            <div className="text-6xl text-primary font-bold mb-3">Departements</div>
                            <DataTable value={depts} showGridlines stripedRows tableStyle={{ minWidth: '50rem' }}>
                                <Column field="iddept" header="Id"></Column>
                                <Column field="libdept" header="Nom"></Column>
                                <Column field="idregion" header="Region" body={regionBodyTemplate}></Column>
                            </DataTable>
                        </section>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Departement;