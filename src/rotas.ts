import { LeadsForm } from "./pages/leads/leadsForm";
import LeadsListagem from "./pages/leads/leadsListagem";

let rotas = [
    { path: "/leads", exact: true, component: LeadsListagem },
    { path: "/leads/cadastro", component: LeadsForm },
]

export default rotas;