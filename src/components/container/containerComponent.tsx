import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import './ConteinerComponent.scss'

export default class ContainerComponent extends React.Component {
    render() {
        return <>
            <Container>
                <Row>
                    <Col md={{ span: 12, offset: 1 }}>
                        <div className="logo_acerta">
                            <img className="logo" src="/img/logo_acerta.svg" alt="Logo da Acerta" />
                        </div>
                    </Col>
                </Row>
                <Row>
                    {this.props.children}
                </Row>
            </Container>
        </>
    }
}