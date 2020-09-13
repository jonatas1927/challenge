import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ButtonComponent from '../../components/button/ButtonComponent'
import TableComponent, { TableColumn } from '../../components/table/TableComponent'

export default class LeadsListagem extends React.Component {
    collumns: TableColumn[] = [
        { field: 'email', header: "Email", search: false },
        { field: 'nome', header: "Nome", search: true },
        { field: 'cpf', header: "CPF", search: true, type: "cpf" }
    ]
    state = {
        data: [{
            email: "jonatas1927@gmail.com",
            nome: "Jônatas Thielke",
            cpf: "000.000.000-00"
        }]
    }

    beforeTable = <div>
        <ButtonComponent type="link" url="/leads/cadastro" label="Novo Lead" />
    </div>

    render() {
        return <div>

            <Container>
                <Row>
                    <Col >
                        <TableComponent collumns={this.collumns} data={this.state.data} pageName="Consulta de Leads" beforeTable={this.beforeTable} />
                    </Col>
                </Row>
            </Container>
        </div>
    }
}