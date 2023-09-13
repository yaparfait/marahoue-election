import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { BreadCrumb } from 'primereact/breadcrumb';
import MenuGeneral from './MenuGeneral';

function Saisie() {
    const items = [{ label: 'Application' }, { label: 'Saisie des valeurs' }];
    const home = { icon: 'pi pi-home', url: '/accueil' }

  return (
    <div>
      <MenuGeneral />
      <BreadCrumb model={items} home={home} className='filAriane'/>

      <div className="surface-section px-4 py-5 md:px-6 lg:px-8">
        
        <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
          <div className="text-6xl text-primary font-bold mb-3">Saisie des valeurs</div>
        </div>
      </div>

    </div>
  );
}

export default Saisie;
