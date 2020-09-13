import React from 'react'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import './tableComponent.scss'
import * as yup from 'yup';
import ButtonComponent from '../button/ButtonComponent';



export interface TableColumn {
    header: string
    field: string
    search?: boolean
    customRender?: (value: any, row: any) => React.Component
    type?: "text" | "email" | "phone" | "number" | "cpf" | null
}

export interface TableComponentProps {
    collumns: TableColumn[]
    data: any[]
    pageName: string
    beforeTable?: any
}

export default class TableComponent extends React.Component<TableComponentProps>{

    formSearchValidation = yup.object().shape({
        nome: yup.string().required(),
        cpf: yup.string(),
    });

    customTypeFormSearch(col: TableColumn) {
        switch (col.type) {
            case 'cpf':
                return 'text'
                break;

            default:
                break;
        }
    }

    goSearch(values: any) {
        let dados = this.formSearchValidation.cast(values)
    }

    render() {
        return <div>
            <Container>
                <Row>
                    <div className="title_page">
                        {this.props.pageName}
                    </div>
                </Row>
                <Row>
                    <div className="form_search">
                        <Container>
                            <Row>
                                <div className="title">
                                    <span>Filtros</span>
                                </div>
                            </Row>
                        </Container>
                        <Form className="form">
                            <Row>
                                {
                                    this.props.collumns.map(col => {
                                        return col.search ? <Col>
                                            <Form.Group controlId={col.field}>
                                                <Form.Label className="form_label">{col.header}</Form.Label>
                                                <Form.Control type={col.type ? this.customTypeFormSearch(col) : 'text'} placeholder={col.header} />
                                            </Form.Group>
                                        </Col> : null
                                    })
                                }
                            </Row>


                            <Row>
                                <Col md={{ span: 8, offset: 7 }}>
                                    <ButtonComponent type="submit" label="Filtrar" />
                                </Col>
                            </Row>

                        </Form>
                    </div>
                </Row>
                <Row>{this.props.beforeTable ? this.props.beforeTable : null}</Row>
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th className="column_header"></th>
                                {this.props.collumns.map((col, index) => {
                                    return <th className="column_header" key={index}>{col.header}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody className="table_contant">
                            <tr>
                                <td>actions</td>
                                {this.props.data.map(row => {
                                    return this.props.collumns.map((col, index) => {
                                        return <td>{row[col.field]}</td>
                                    })
                                })}
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div >
    }
}