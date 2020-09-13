import React from 'react'
import { Table } from 'react-bootstrap'
import './tableComponent.scss'

export interface TableColumn {
    header: string
    field: string
    search?: boolean
    customRender?: (value: any, row: any) => React.Component
}

export interface TableComponentProps {
    collumns: TableColumn[]
    data: any[]
}

export default class TableComponent extends React.Component<TableComponentProps>{



    render() {
        return <div>
            <div>
                form search
            </div>
            <div style={{ textAlign: "center" }}>
                <Table responsive>
                    <thead>
                        <tr>
                            <th></th>
                            {/* {Array.from({ length: 12 }).map((_, index) => (
                                <th key={index}>Table heading</th>
                            ))} */}
                            {this.props.collumns.map((col, index) => {
                                return <th key={index}>{col.header}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>actions</td>
                            {this.props.data.map(row => {
                                return this.props.collumns.map((col, index) => {
                                    return <td>{row[col.field]}</td>
                                })
                            })}
                            {/* <td>1</td>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))} */}
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div >
    }
}