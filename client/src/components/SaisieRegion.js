import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import MenuGeneral from "./MenuGeneral";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Menu } from 'primereact/menu';

function SaisieRegion() {

    const items = [{ label: 'Application' }, { label: 'Saisie des votes' }];
    const home = { icon: 'pi pi-home', url: '/accueil' }
    let departItems = [
        {label: 'BOUAFLE', icon: 'pi pi-fw pi-sitemap'},
        {label: 'BONON', icon: 'pi pi-fw pi-sitemap'},
        {label: 'GOHITAFLA', icon: 'pi pi-fw pi-sitemap'},
        {label: 'SINFRA', icon: 'pi pi-fw pi-sitemap'},
        {label: 'ZUENOULA', icon: 'pi pi-fw pi-sitemap'}
    ];
    let sprefComItems = [
        {label: 'Bouafle Commune', icon: 'pi pi-fw pi-sun'},
        {label: 'Bouafle S/P', icon: 'pi pi-fw pi-sun'},
        {label: 'BEGBESSOU', icon: 'pi pi-fw pi-sun'},
        {label: 'N\'DOUFFOUKANKRO', icon: 'pi pi-fw pi-sun'},
        {label: 'PAKOUABO', icon: 'pi pi-fw pi-sun'},
        {label: 'TIBEITA', icon: 'pi pi-fw pi-sun'}
    ];
    let localiteItems = [
        {label: 'BOUAFLÉ', icon: 'pi pi-fw pi-map-marker'},
        {label: 'ALLANGBA - KONANKRO', icon: 'pi pi-fw pi-map-marker'},
        {label: 'BLAMA', icon: 'pi pi-fw pi-map-marker'},
        {label: 'KONGO YOBOUESSOU', icon: 'pi pi-fw pi-map-marker'},
        {label: 'N\'GATTAKRO', icon: 'pi pi-fw pi-map-marker'},
        {label: 'OUSSOU YAOKRO', icon: 'pi pi-fw pi-map-marker'},
        {label: 'KOUDOUGOU', icon: 'pi pi-fw pi-map-marker'},
        {label: 'KOUPÉLA', icon: 'pi pi-fw pi-map-marker'},
        {label: 'ZAGOUTA', icon: 'pi pi-fw pi-map-marker'}
    ];
    /* let lieuItems = [
        {label: 'GS Biaka', icon: 'pi pi-fw pi-flag'},
        {label: 'College Moderne Charles Koffi DIBY', icon: 'pi pi-fw pi-flag'},
        {label: 'GS Village SOS de Koupela', icon: 'pi pi-fw pi-flag'},
        {label: 'EPP Dioulabougou', icon: 'pi pi-fw pi-flag'},
        {label: 'EPP Datecouman', icon: 'pi pi-fw pi-flag'},
        {label: 'EPP Deita', icon: 'pi pi-fw pi-flag'},
        {label: 'GS Camp militaire', icon: 'pi pi-fw pi-flag'}    
    ]; */

    return (
        <div>
            <MenuGeneral />

            <div class="grid">
                <div class="col-fixed" style={{ width: '300px'}}>
                    <div className="col-12 p-2 text-center md:text-left flex align-items-center surface-0 text-800 shadow-4">

                        <div class="flex flex-column">
                            <div class="flex align-items-center justify-content-center h-3rem text-primary font-bold border-round text-xl">
                                <p class="uppercase">Region de la Marahoue</p>
                            </div>
                            <div class="flex align-items-center justify-content-center h-1rem text-primary font-bold border-round text-2xl">
                                ---------------
                            </div>
                            <div class="flex align-items-center justify-content-center h-2rem text-primary font-bold border-round text-xl">
                                Departements
                            </div>
                            <div class="flex align-items-center justify-content-center border-round m-2">                               
                                <Menu model={departItems} style={{width: '100%'}}/>
                            </div>  
                            <div class="flex align-items-center justify-content-center h-2rem text-primary font-bold border-round text-xl">
                                Communes et S-Prefectures
                            </div>
                            <div class="flex align-items-center justify-content-center border-round m-2">                               
                                <Menu model={sprefComItems} style={{width: '100%'}}/>
                            </div>  
                            <div class="flex align-items-center justify-content-center h-2rem text-primary font-bold border-round text-xl">
                                Localités
                            </div>                          
                            <div class="flex align-items-center justify-content-center border-round m-2">
                                <Menu model={localiteItems} style={{width: '100%'}}/>
                            </div>
                           
                        </div>

                    </div>
                </div>
                <div class="col">
                    <BreadCrumb model={items} home={home} className="filAriane" />
                    <div className="col-12 p-4 text-center md:text-left flex align-items-center surface-0 text-800">
                        <section>
                            {/* <span className="block text-6xl font-bold mb-1">Create the screens</span> */}
                            <div className="text-6xl text-primary font-bold mb-3">your visitors deserve to see</div>
                            <p className="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </section>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SaisieRegion;