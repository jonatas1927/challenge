import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ButtonComponentProp } from './ButtonComponent'
import './ButtonComponent.scss'


export default class ButtonCancelComponent extends React.Component<ButtonComponentProp> {
    render() {
        switch (this.props.type) {
            case "submit":
                return <Button variant="cancel" type="submit">{this.props.label}</Button>
            case 'link':
                return <Link to={this.props.url + ""} ><Button variant="cancel">{this.props.label}</Button></Link>
            default:
                return <Button type="submit" variant="cancel">{this.props.label}</Button>
        }
    }
}