import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ButtonComponent from '../../components/button/ButtonComponent'
import TableComponent, { TableColumn } from '../../components/table/TableComponent'
import Axios from 'axios'

export default class LeadsListagem extends React.Component<any> {

    collumns: TableColumn[] = [
        { field: 'email', header: "Email", search: false },
        { field: 'nome', header: "Nome", search: true },
        {
            field: 'cpf', header: "CPF", search: true, type: "cpf", customFormat: (val, row) => {
                return val.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
                    function (regex, argumento1, argumento2, argumento3, argumento4) {
                        return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
                    })
            }
        }
    ]
    state = {
        data: []
    }

    beforeTable = <div>
        <ButtonComponent type="link" url="/leads/form" label="Novo Lead" />
    </div>

    componentDidMount() {
        Axios.get('/leads').then(values => {
            this.setState({ data: values.data })
        }).catch(error => {
            alert('houve um erro ao buscar leads')
        })
    }

    atualizarDadosFiltros = (values => {

        if (values.nome === "")
            delete values.nome
        if (values.cpf === "")
            delete values.cpf

        Axios.get('/leads', { params: values }).then(values => {
            this.setState({ data: values.data })
        }).catch(error => {
            alert('houve um erro ao buscar leads')
        })
    })

    deleteMethod(row) {
        Axios.delete(`/leads/${row.id}`).then(val => {
            this.atualizarDadosFiltros({})
        }).catch(error => {
            alert('houve um erro ao deletar o lead')
        })
    }

    editMethod(row) {
        this.props.history.push(`/leads/form/${row.id}`)
    }

    render() {
        return <div>

            <Container>
                <Row>
                    <Col >
                        <TableComponent editMethod={this.editMethod.bind(this)} deleteMethod={this.deleteMethod.bind(this)} collumns={this.collumns} data={this.state.data} pageName="Consulta de Leads" beforeTable={this.beforeTable} filterMethod={this.atualizarDadosFiltros} />
                    </Col>
                </Row>
            </Container>
        </div>
    }
}