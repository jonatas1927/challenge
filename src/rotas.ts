import { LeadsForm } from "./pages/leads/leadsForm";
import LeadsListagem from "./pages/leads/leadsListagem";

let rotas = [
    { path: "/leads", exact: true, component: LeadsListagem },
    { path: "/leads/form", exact: true, component: LeadsForm },
    { path: "/leads/form/:id", component: LeadsForm },
]

export default rotas;