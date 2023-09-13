import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import MenuGeneral from "./MenuGeneral";
import { BreadCrumb } from 'primereact/breadcrumb';
//import { Menu } from 'primereact/menu';
import MenuParamItems from "./MenuParamItems.js";

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
                            <span className="block text-6xl text-primary font-bold mb-1">Create the screens</span>
                            <div className="text-6xl text-primary font-bold mb-3">your visitors deserve to see</div>
                            <p className="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </section>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Parametrage;