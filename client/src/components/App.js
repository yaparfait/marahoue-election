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
import { AuthProvider, RequireAuth } from 'react-auth-kit';

function App() {

  useEffect(() => {
    document.title = "Municipales 2023 - Bouaflé"
  }, [])

  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Connexion />} />
          <Route exact path="/accueil" element={
            <RequireAuth loginPath='/'>
              <Accueil />
            </RequireAuth>
          }/>
          <Route exact path="/saisie" element={
            <RequireAuth loginPath='/'>
              <Saisie />
            </RequireAuth>
          }/>
          <Route exact path="/saisie-mairie" element={
            <RequireAuth loginPath='/'>
              <SaisieMairie />
            </RequireAuth>
          }/>
          <Route exact path="/saisie-region" element={
            <RequireAuth loginPath='/'>
              <SaisieRegion />
            </RequireAuth>
          }/>
          <Route exact path="/consultation" element={
            <RequireAuth loginPath='/'>
              <ConsultationSaisie />
            </RequireAuth>
          }/>
          <Route exact path="/parametrage" element={
            <RequireAuth loginPath='/'>
              <Parametrage />
            </RequireAuth>
          }/>
          <Route exact path="/template" element={<PageTemplate />} />
          <Route exact path="/departements" element={
            <RequireAuth loginPath='/'> 
              <Departement />
            </RequireAuth>
          }/>
          <Route exact path="/souspref-commune" element={
            <RequireAuth loginPath='/'>
              <SousprefCommune />
            </RequireAuth>
          }/>
          <Route exact path="/centre-vote" element={
            <RequireAuth loginPath='/'>
              <CentreVote />
            </RequireAuth>
          }/>
        </Routes>
      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;
