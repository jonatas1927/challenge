import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ButtonComponent from '../../components/button/ButtonComponent'
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik';

import './leads.scss'

interface MyFormValues {
    firstName: string;
}

export class LeadsForm extends React.Component {
    render() {
        const initialValues: MyFormValues = { firstName: '' };
        return <>
            <Container>
                <Row >
                    <Col className="title_page">
                        <span>Cadastro de Leads</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="form_box">
                            <Container>
                                <Row>
                                    <div className="title">
                                        <span>Filtros</span>
                                        {/* ta no modelo assim, algum teste de detalhes? sla */}
                                    </div>
                                </Row>
                                <Row>
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={(values, actions) => {
                                            console.log({ values, actions });
                                            alert(JSON.stringify(values, null, 2));
                                            actions.setSubmitting(false);
                                        }}
                                        render={formikBag => (
                                            <Form>
                                                <Field
                                                    name="firstName"
                                                    render={({ field, form, meta }) => (
                                                        <div>
                                                            <input type="text" {...field} placeholder="First Name" />
                                                            {meta.touched && meta.error && meta.error}
                                                        </div>
                                                    )}
                                                />
                                            </Form>
                                        )}
                                    />
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>

            </Container>
        </>
    }
}