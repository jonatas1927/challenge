import { rootCertificates } from "tls";
import LeadsListagem from "./pages/leads/leadsListagem";

let rotas = [
    { path: "/leads", component: LeadsListagem },
    { path: "/leads/cadastro", component: null },
]

export default rotas;