import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/Accueil.css';
import MenuGeneral from './MenuGeneral';
import { BreadCrumb } from 'primereact/breadcrumb';
import askPic from '../assets/ask_pic1.jpg';
import transition from './transition';
//import logoMarahoue from '../assets/laMarahoue.png';
//import { useAuthUser, useAuthHeader } from 'react-auth-kit';

function Accueil() {
  const items = [{ label: 'Bienvenue sur le système de gestion electronique de l\'election municipale' }];
  const home = { icon: 'pi pi-home', url: '/accueil' }
  //const auth = useAuthUser();
  //const authHeader = useAuthHeader();

  return (
    <div>
      <MenuGeneral />
      <BreadCrumb model={items} home={home} className='filAriane ' />

      <div className="grid grid-nogutter surface-0 text-800 shadow-2">
        <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
          <section>
            <span className="block text-6xl text-primary font-bold mb-1">AZI SERGES KOFFI « ASK »</span>
            <span className="block text-6xl text-green-700 font-bold mb-1">Maire de la commune de Bouaflé</span>
            <div className="text-6xl text-primary font-bold mb-3">Un Homme, Une vision</div>
          </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden">
          <img src={askPic} alt="illustration de M. le Maire" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
        </div>
      </div>

    </div>
  );

}

export default transition(Accueil);