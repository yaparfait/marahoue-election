import { Menu } from 'primereact/menu';
import { useNavigate } from "react-router-dom";
//const navigate = useNavigate();
export default function MenuParamItems() {
    const navigate = useNavigate();
    const items = [
        {
            label: 'Cartographie',
            items: [
                {
                    label: 'Departements',
                    icon: 'pi pi-fw pi-plus',
                    command: () => navigate('/departements')
                },
                {
                    label: 'Communes et Sous-Prefectures',
                    icon: 'pi pi-fw pi-map-marker',
                    command: () => navigate('/souspref-commune')
                },               
                {
                    label: 'Lieux de vote', 
                    icon: 'pi pi-fw pi-sitemap',
                    command: () => navigate('/centre-vote')
                }
            ]
        },
        /*
        {
            label: 'Centres de vote',
            items: [
                {
                    label: 'Lieux de vote', 
                    icon: 'pi pi-fw pi-sitemap',
                    command: () => navigate('/centre-vote')
                },
                {
                    label: 'Bureaux de vote',
                    icon: 'pi pi-fw pi-trash'
                }
            ]
        },
        */
        {
            label: 'Candidature',
            items: [
                {
                    label: 'Partis politiques',
                    icon: 'pi pi-fw pi-users'
                },
                {
                    label: 'Candidats',
                    icon: 'pi pi-fw pi-user'
                },
                {
                    label: 'Scrutins',
                    icon: 'pi pi-fw pi-envelope'
                }
            ]
        },
        {
            label: 'Gestion des Comptes',
            items: [
                {
                    label: 'Profiles',
                    icon: 'pi pi-fw pi-lock'
                },
                {
                    label: 'Utilisateurs',
                    icon: 'pi pi-fw pi-user'
                }
            ]
        }
    ];

    return (
        <div class="flex flex-column">
            <div class="flex align-items-center justify-content-center h-3rem text-primary font-bold border-round text-xl">
                <p class="uppercase">Parametrage</p>
            </div>

            <div class="flex align-items-center justify-content-center border-round m-2">
                <Menu model={items} style={{ width: '100%' }} />
            </div>
        </div>
    )
}

//export default MenuParamItems;