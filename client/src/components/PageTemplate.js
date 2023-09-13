import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import MenuGeneral from "./MenuGeneral";
import { BreadCrumb } from 'primereact/breadcrumb';

function PageTemplate() {

    const items = [{ label: 'Application' }, { label: 'Template des pages' }];
    const home = { icon: 'pi pi-home', url: '/accueil' }

    return (
        <div>
            <MenuGeneral />

            <div class="grid">
                <div class="col-fixed" style={{ width: '200px'}}>
                    <div className="col-12 p-4 text-center md:text-left flex align-items-center surface-0 text-800 shadow-2">

                        <div class="flex flex-column">
                            <div class="flex align-items-center justify-content-center h-2rem text-primary font-bold border-round">
                                Menu de la Page
                            </div>
                            <div class="flex align-items-center justify-content-center h-4rem bg-primary font-bold border-round m-2">
                                1
                            </div>
                            <div class="flex align-items-center justify-content-center h-4rem bg-primary font-bold border-round m-2">
                                2
                            </div>
                            <div class="flex align-items-center justify-content-center h-4rem bg-primary font-bold border-round m-2">
                                3
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col">
                    <BreadCrumb model={items} home={home} className="filAriane" />
                    <div className="col-12 p-4 text-center md:text-left flex align-items-center surface-0 text-800">
                        <section>
                            <span className="block text-6xl font-bold mb-1">Create the screens</span>
                            <div className="text-6xl text-primary font-bold mb-3">your visitors deserve to see</div>
                            <p className="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </section>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PageTemplate;