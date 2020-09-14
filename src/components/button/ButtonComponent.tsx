import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ButtonComponent.scss'

export interface ButtonComponentProp {
    type: "submit" | "link" | "button"
    label: string
    url?: string
    onClick?: () => void
}

export default class ButtonComponent extends React.Component<ButtonComponentProp> {
    render() {
        switch (this.props.type) {
            case "submit":
                return <Button variant="flat" type="submit" onClick={this.props.onClick}>{this.props.label}</Button>
            case 'link':
                return <Link to={this.props.url + ""} onClick={this.props.onClick} ><Button variant="flat">{this.props.label}</Button></Link>
            default:
                return <Button onClick={this.props.onClick} variant="flat">{this.props.label}</Button>
        }
    }
}