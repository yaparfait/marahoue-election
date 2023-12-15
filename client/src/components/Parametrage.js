import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import MenuGeneral from "./MenuGeneral";
import { BreadCrumb } from 'primereact/breadcrumb';
//import { Menu } from 'primereact/menu';
import MenuParamItems from "./MenuParamItems.js";
import transition from "./transition";

function Parametrage() {

    const items = [{ label: 'Application' }, { label: 'Parametrage' }];
    const home = { icon: 'pi pi-home', url: '/accueil' }

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
                            <span className="block text-6xl text-primary font-bold mb-1">Parametrage des elements de reference</span>
                            <p className="mt-0 mb-4 text-700 line-height-3">Creation, modification et suppression des Departements, des Communes/Sous-Prefectures, des Lieux de vote, des Partis Politiques, des Candidats, des Scrutions et des Comptes Utilisateurs</p>
                        </section>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default transition(Parametrage);