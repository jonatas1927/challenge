import React from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import './tableComponent.scss'
import ButtonComponent from '../button/ButtonComponent';
import { Field, Form, Formik } from 'formik';
import { Form as FormBoots } from 'react-bootstrap'
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";

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
    beforeTable?: any,
    filterMethod: (values: object) => any
    deleteMethod: (row: object) => void
    editMethod: (row: object) => void
}

export default class TableComponent extends React.Component<TableComponentProps>{


    customTypeFormSearch(col: TableColumn) {
        switch (col.type) {
            case 'cpf':
                return 'text'
            default:
                break;
        }
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
                        <Formik
                            initialValues={{}}
                            onSubmit={(values, actions) => {

                                actions.setSubmitting(true);
                            }}
                            render={formikBag => (
                                <Form>
                                    <Container>
                                        <Row>
                                            {this.props.collumns.map(col => {
                                                return col.search ?
                                                    <Col>
                                                        <Field
                                                            name={col.field}
                                                            render={({ field, form, meta }) => (
                                                                <>
                                                                    <FormBoots.Group controlId={col.field}>
                                                                        <FormBoots.Label className="form_label">{col.header}</FormBoots.Label>
                                                                        <FormBoots.Control type={col.type ? this.customTypeFormSearch(col) : 'text'} placeholder={col.header} {...field} />
                                                                    </FormBoots.Group>
                                                                </>
                                                            )}
                                                        />
                                                    </Col> : null
                                            })}
                                        </Row>
                                        <Row>
                                            <Col md={{ span: 8, offset: 7 }}>
                                                <ButtonComponent type="button" label="Filtrar" onClick={() => {
                                                    this.props.filterMethod(formikBag.values)
                                                    // console.log(formikBag, 'aaaa')
                                                }} />
                                            </Col>
                                        </Row>
                                    </Container>
                                </Form>
                            )}
                        />
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
                            {this.props.data.map(row => {
                                return <tr>
                                    <td><BsFillTrashFill onClick={() => this.props.deleteMethod(row)} /> <BsPencilSquare onClick={() => this.props.editMethod(row)} /> </td>
                                    {this.props.collumns.map((col, index) => {
                                        return <td>{row[col.field]}</td>
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div >
    }
}