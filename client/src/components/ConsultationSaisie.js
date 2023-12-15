import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import MenuGeneral from "./MenuGeneral";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Chart } from 'primereact/chart';
import { useState, useEffect } from 'react';
//import { DataTable } from 'primereact/datatable';
//import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { DataView  } from 'primereact/dataview';
//import askPic1 from '../assets/ask_pic1.jpg';
import askPic2 from '../assets/ask_pic2.jpg';
import otherCand from '../assets/app_user.png';
import exaequo from '../assets/exaequo.png';
import yaoPic from '../assets/yao_etienne.jpg';
import { getResultatMunicipales } from "../services/VoterService";
import transition from "./transition";
//const voterService = require("../services/VoterService.js");

function ConsultationSaisie() {

    const items = [{ label: 'Application' }, { label: 'Consultation des resultats' }];
    const home = { icon: 'pi pi-home', url: '/accueil' }
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [pieData, setPieData] = useState({});
    const [pieOptions, setPieOptions] = useState({});
    const [resultats, setResultats] = useState([]);
    const [winners, setWinners] = useState(null);

    const isWinner = (resultat) => { 
        const maxval = resultats.map(res => res.score).reduce((a,b) => Math.max(a, b));   
        return maxval.toString() === resultat.score;
    };

    const getSeverity = (resultat) => {
        return isWinner(resultat) ? "success" : "danger";
    }

    const getTagValue = (resultat) => {
        return isWinner(resultat) ? 'Vainqueur' : 'Perdant';
    }
    /*
    const getWinnerInfo = (results) => {
        const maxval = results.map(res => res.score).reduce((a,b) => Math.max(a, b));
        const wins = results.filter(result => result.score === maxval.toString()) 
        return wins;
    }
    */
    const statusBodyTemplate = (resultat) => {
        return <Tag value={getTagValue(resultat)} severity={getSeverity(resultat)}></Tag>;
    };

    const pourcentage = (resultat) => {
        const somme = resultats.reduce((acc, r) => acc + parseInt(r.score), 0);
        return somme === 0 ? 0 : (resultat.score/somme*100).toFixed(2);
    }

    const itemTemplate = (resultat) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-3 gap-4">
                    <img className="w-4 sm:w-4rem xl:w-3rem shadow-2 block xl:block mx-auto border-round" src={otherCand} alt={resultat.nomcand} />
                    {/*<i className="pi pi-user text-primary text-2xl"></i>*/}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-l font-bold">{resultat.nomcand}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="text-sm">{resultat.sigle}</span>
                                </span>
                                {statusBodyTemplate(resultat)}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-xl font-semibold">{resultat.score}</span>
                            <span className="text-l font-semibold text-green-500">{pourcentage(resultat)}%</span>
                        </div>
                    </div>
                </div>    
            </div>       
        );
    };

    useEffect(() => {
        const loadData = () => {
            getResultatMunicipales().then(result => {
                setResultats(result);
                const maxval = result.map(res => res.score).reduce((a,b) => Math.max(a, b));
                setWinners(result.filter(result => result.score === maxval.toString()));
                //alert(getWinnerInfo(result))
                const data = {
                    labels: [result[0].nomusuel, result[1].nomusuel, result[2].nomusuel, result[3].nomusuel],
                    datasets: [
                        {
                            label: 'Scores',
                            data: [result[0].score, result[1].score, result[2].score, result[3].score],
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)'
                            ],
                            borderColor: [
                                'rgb(75, 192, 192)',
                                'rgb(255, 159, 64)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)'
                            ],
                            borderWidth: 1
                        }
                    ]
                };
                const options = {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                };
        
                const documentStyle = getComputedStyle(document.documentElement);
                const piedata = {
                    labels: [result[0].nomusuel, result[1].nomusuel, result[2].nomusuel, result[3].nomusuel],
                    datasets: [
                        {
                            data: [result[0].score, result[1].score, result[2].score, result[3].score],
                            backgroundColor: [
                                documentStyle.getPropertyValue('--green-500'),
                                documentStyle.getPropertyValue('--orange-500'),
                                documentStyle.getPropertyValue('--blue-500'), 
                                documentStyle.getPropertyValue('--indigo-500') 
                                
                            ],
                            hoverBackgroundColor: [
                                documentStyle.getPropertyValue('--green-400'),
                                documentStyle.getPropertyValue('--orange-400'),
                                documentStyle.getPropertyValue('--blue-400'), 
                                documentStyle.getPropertyValue('--indigo-400')
                            ]
                        }
                    ]
                }
                const pieoptions = {
                    plugins: {
                        legend: {
                            labels: {
                                usePointStyle: true
                            }
                        }
                    }
                };
        
                setChartData(data);
                setChartOptions(options);
                setPieData(piedata);
                setPieOptions(pieoptions);
            });
        }
        loadData();
        /*
        const intervalId = setInterval(() => {
            loadData(); // Fetch data every 1 minutes
        }, 60000);
  
        return () => clearInterval(intervalId);
        */
    }, []);

    return (
        <div>
            <MenuGeneral />
            <BreadCrumb model={items} home={home} className='filAriane' />

            <div className="surface-ground px-4 py-5 md:px-6 lg:px-8">
                <div className="grid">
                    <div className="col-12 md:col-6 lg:col-4">
                        <div className="surface-card shadow-2 p-3 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 text-xl font-medium mb-3">Vainqueur</span>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-red-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-heart fa-regular fa-user text-red-500 text-xl"></i>
                                </div>
                            </div>
                            <div className="flex align-items-center">
                                {winners && winners.length===1 && <span className="text-green-500 font-bold text-4xl">Félicitations</span>}
                                {winners && winners.length>1 && <img src={exaequo} alt="Exeaquo" className="md:ml-auto md:h-full" />}
                                {winners && winners.length===1 && winners[0].nomusuel==='ASK' && <img src={askPic2} alt="illustration de M. le Maire" className="md:ml-auto  md:h-full" />}
                                {winners && winners.length===1 && winners[0].nomusuel==='YAO ETIENNE' && <img src={yaoPic} alt="illustration de M. le Maire" className="md:ml-auto  md:h-full" />}
                                {winners && winners.length===1 && winners[0].nomusuel!=='ASK' && winners[0].nomusuel!=='YAO ETIENNE'  && <img src={otherCand} alt="Autres Candidats" className="md:ml-auto md:h-full" />}
                            </div>                           
                            <span className="text-500">Monsieur </span>
                            <span className="text-green-700 font-bold">{winners && winners.length===1 && winners[0].nomcand}</span>
                        </div>
                        <div className="surface-card shadow-2 p-3 mt-3 border-round">
                            <DataView value={resultats} itemTemplate={itemTemplate} />
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-8">
                        <div className="surface-card shadow-2 p-3 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 text-xl font-medium mb-3">Resultats</span>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-green-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-envelope text-green-500 text-xl"></i>
                                </div>
                            </div>
                            <div className="card mb-5">
                                <Chart type="bar" data={chartData} options={chartOptions} />
                            </div>
                            <div className="card flex justify-content-center mt-5">
                                <Chart type="pie" data={pieData} options={pieOptions} className="w-full md:w-30rem" />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default transition(ConsultationSaisie);