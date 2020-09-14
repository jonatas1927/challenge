import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ButtonComponent from '../../components/button/ButtonComponent'
import TableComponent, { TableColumn } from '../../components/table/TableComponent'
import Axios from 'axios'

export default class LeadsListagem extends React.Component {
    collumns: TableColumn[] = [
        { field: 'email', header: "Email", search: false },
        { field: 'nome', header: "Nome", search: true },
        { field: 'cpf', header: "CPF", search: true, type: "cpf" }
    ]
    state = {
        data: []
    }

    beforeTable = <div>
        <ButtonComponent type="link" url="/leads/cadastro" label="Novo Lead" />
    </div>

    componentDidMount() {
        Axios.get('/leads').then(values => {
            this.setState({ data: values.data })
        }).catch(error => {
            console.log(error)
            alert('houve um erro ao buscar leads')
        })
    }

    atualizarDadosFiltros = (values => {
        console.log(values, 'dashudhsa')
        if (values.nome === "")
            delete values.nome
        if (values.cpf === "")
            delete values.cpf

        Axios.get('/leads', { params: values }).then(values => {
            console.log(values)
            this.setState({ data: values.data })
        }).catch(error => {
            console.log(error)
            alert('houve um erro ao buscar leads')
        })
    })

    deleteMethod(row) {

    }
    editMethod(row) {

    }

    render() {
        return <div>

            <Container>
                <Row>
                    <Col >
                        <TableComponent editMethod={this.editMethod} deleteMethod={this.deleteMethod} collumns={this.collumns} data={this.state.data} pageName="Consulta de Leads" beforeTable={this.beforeTable} filterMethod={this.atualizarDadosFiltros} />
                    </Col>
                </Row>
            </Container>
        </div>
    }
}