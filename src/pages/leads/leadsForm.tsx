import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ButtonComponent from '../../components/button/ButtonComponent'
import { Form as FormBoots } from 'react-bootstrap'
import {
    Formik,
    Form,
    Field,
} from 'formik';
import * as yup from 'yup';
import MaskedInput from "react-maskedinput";
import './leads.scss'
import ButtonCancelComponent from '../../components/button/ButtonCancelComponent';
import Axios from 'axios';

interface MyFormValues {
    nome: string;
    cpf: string;
    email: string;
    estado_civil: string;
    nome_conjuge: string;
}

export class LeadsForm extends React.Component<any> {
    modelLeads = yup.object().shape({
        nome: yup.string().required("Nome é obrigatório"),
        cpf: yup.string().required("CPF é obrigatório").test('validacao_cpf', 'CPF inválido', (cpf: any) => {
            if (typeof cpf !== "string") return false
            cpf = cpf.replace(/[\s.-]*/igm, '')
            if (
                !cpf ||
                cpf.length !== 11 ||
                cpf === "00000000000" ||
                cpf === "11111111111" ||
                cpf === "22222222222" ||
                cpf === "33333333333" ||
                cpf === "44444444444" ||
                cpf === "55555555555" ||
                cpf === "66666666666" ||
                cpf === "77777777777" ||
                cpf === "88888888888" ||
                cpf === "99999999999"
            ) {
                return false
            }
            let soma = 0
            let resto
            for (let i = 1; i <= 9; i++)
                soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
            resto = (soma * 10) % 11
            if ((resto === 10) || (resto === 11)) resto = 0
            if (resto !== parseInt(cpf.substring(9, 10))) return false
            soma = 0
            for (let i = 1; i <= 10; i++)
                soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
            resto = (soma * 10) % 11
            if ((resto === 10) || (resto === 11)) resto = 0
            if (resto !== parseInt(cpf.substring(10, 11))) return false
            return true
        }),
        email: yup.string().email().required("Email é obrigatório"),
        estado_civil: yup.string().required("Estado Civil é obrigatório"),
        nome_conjuge: yup.string().when('estado_civil', { is: 'Casado(a)', then: field => field.required("Nome do Conjuge é obrigatório") })
    });
    render() {

        const initialValues: MyFormValues = {
            nome: "",
            cpf: "",
            email: "",
            estado_civil: "",
            nome_conjuge: "",
        };
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
                                        <span>Leads</span>
                                    </div>
                                </Row>
                                <Row>
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={(values, actions) => {
                                            Axios.post('/leads', values).then(() => {
                                                this.props.history.push("/leads")
                                            }).catch(error => {
                                                console.log(error)
                                                alert('Ocorreu um erro ao salvar o Lead')
                                            })
                                            actions.setSubmitting(true);
                                        }}
                                        validationSchema={this.modelLeads}
                                        render={() => (
                                            <Form>
                                                <Container>
                                                    <Row>
                                                        <Col>
                                                            <Field
                                                                name="nome"
                                                                render={({ field, meta }) => (
                                                                    <div>
                                                                        <FormBoots.Group controlId="Nome" {...field}>
                                                                            <FormBoots.Label>Nome </FormBoots.Label>
                                                                            <FormBoots.Control type="text" placeholder="Nome"  {...field} />
                                                                        </FormBoots.Group>
                                                                        {meta.touched && meta.error && meta.error}
                                                                    </div>
                                                                )}
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Field
                                                                name="cpf"
                                                                render={({ field, meta }) => (
                                                                    <div>
                                                                        <FormBoots.Group controlId="cpf" {...field}>
                                                                            <FormBoots.Label>CPF</FormBoots.Label>
                                                                            <FormBoots.Control as={MaskedInput} mask="111.111.111-11" type="text" placeholder="CPF"   {...field} />
                                                                        </FormBoots.Group>
                                                                        {meta.touched && meta.error && meta.error}
                                                                    </div>
                                                                )}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Field
                                                                name="email"
                                                                render={({ field, meta }) => (
                                                                    <div>
                                                                        <FormBoots.Group controlId="email" {...field}>
                                                                            <FormBoots.Label>Email</FormBoots.Label>
                                                                            <FormBoots.Control type="email" placeholder="Email"  {...field} />
                                                                        </FormBoots.Group>
                                                                        {meta.touched && meta.error && meta.error}
                                                                    </div>
                                                                )}
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Field
                                                                name="estado_civil"
                                                                render={({ field, meta }) => (
                                                                    <div>
                                                                        <FormBoots.Group controlId="estado_civil" {...field}>
                                                                            <FormBoots.Label>Estado Civil</FormBoots.Label>
                                                                            <FormBoots.Control as="select" {...field}>
                                                                                <option value="Solteiro(a)">Solteiro(a)</option>
                                                                                <option value="Casado(a)">Casado(a)</option>
                                                                                <option value="Víuvo(a)">Víuvo(a)</option>
                                                                                <option value="Separado(a)">Separado(a)</option>
                                                                            </FormBoots.Control>
                                                                        </FormBoots.Group>
                                                                        {meta.touched && meta.error && meta.error}
                                                                    </div>
                                                                )}
                                                            />

                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Field
                                                                name="nome_conjuge"
                                                                render={({ field, form, meta }) => {
                                                                    console.log(form.values);
                                                                    return (
                                                                        <div>
                                                                            <FormBoots.Group controlId="nome_conjuge" {...field}>
                                                                                <FormBoots.Label>Nome do Cônjuge</FormBoots.Label>
                                                                                <FormBoots.Control disabled={form.values.estado_civil !== "Casado(a)"} type="text" placeholder="Nome do Cônjuge"  {...field} />
                                                                            </FormBoots.Group>
                                                                            {meta.touched && meta.error && meta.error}
                                                                        </div>
                                                                    )
                                                                }}
                                                            />
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md={{ span: 8, offset: 0 }}>
                                                            <ButtonCancelComponent type="link" label="Cancelar" url="/leads" />
                                                        </Col>
                                                        <Col md={{ span: 8, offset: 7 }}>
                                                            <ButtonComponent type="submit" label="Cadastrar" />
                                                        </Col>
                                                    </Row>
                                                </Container>
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