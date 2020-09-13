import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './ButtonComponent.scss'

export interface ButtonComponentProp {
    type: "submit" | "link"
    label: string
    url?: string
}

export default class ButtonComponent extends React.Component<ButtonComponentProp> {
    render() {
        switch (this.props.type) {
            case "submit":
                return <Button variant="flat" type="submit">{this.props.label}</Button>
            case 'link':
                return <Link to={this.props.url + ""} ><Button variant="flat">{this.props.label}</Button></Link>
            default:
                return <Button type="submit" variant="flat">{this.props.label}</Button>
        }
    }
}