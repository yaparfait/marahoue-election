import '../styles/App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Connexion from './Connexion';
import Accueil from './Accueil';
import Saisie from './Saisie';
import SaisieMairie from './SaisieMairie';
import SaisieRegion from './SaisieRegion';
import ConsultationSaisie from './ConsultationSaisie';
import Parametrage from './Parametrage';
import PageTemplate from './PageTemplate';
import Departement from './Departement';
import SousprefCommune from './SousprefCommune';
import CentreVote from './CentreVote';


function App() {

  useEffect(() => {
    document.title = "Municipales 2023 - Bouaflé"
	}, [])

  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Connexion />} />
          <Route exact path="/accueil" element={<Accueil />} />
          <Route exact path="/saisie" element={<Saisie />} />
          <Route exact path="/saisie-mairie" element={<SaisieMairie />} />
          <Route exact path="/saisie-region" element={<SaisieRegion />} />
          <Route exact path="/consultation" element={<ConsultationSaisie />} />
          <Route exact path="/parametrage" element={<Parametrage />} />
          <Route exact path="/template" element={<PageTemplate />} />
          <Route exact path="/departements" element={<Departement />} />
          <Route exact path="/souspref-commune" element={<SousprefCommune />} />
          <Route exact path="/centre-vote" element={<CentreVote />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
