import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TableComponent from '../../components/table/TableComponent'

export default class LeadsListagem extends React.Component {
    state = {
        collumns: [{ field: 'email', header: "Email", search: false },
        { field: 'nome', header: "Nome", search: true },
        { field: 'cpf', header: "CPF", search: true }],
        data: [{
            email: "jonatas1927@gmail.com",
            nome: "Jônatas Thielke",
            cpf: "000.000.000-00"
        }]
    }
    render() {
        return <div>
            <Container>
                <Row>
                    <Col >
                        <TableComponent collumns={this.state.collumns} data={this.state.data} />
                    </Col>
                </Row>
            </Container>
        </div>
    }
}