import React from 'react'
import { Container, Row } from 'react-bootstrap'

import './ConteinerComponent.scss'

export default class ContainerComponent extends React.Component {
    render() {
        return <>
            <Container>
                <Row>
                    <div className="logo_acerta">
                        <img className="logo" src="/img/logo_acerta.svg" alt="Logo da Acerta" />
                    </div>
                </Row>
                <Row>
                    {this.props.children}
                </Row>
            </Container>
        </>
    }
}