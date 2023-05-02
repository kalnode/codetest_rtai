/* TABLE ABSTRACTION */
import agGridStyles from '../styles/ag-grid.module.css'

import { AgGridReact } from "ag-grid-react"
import { useMemo, useState } from "react"
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

export default function Table({columns = [], rowData = []}:any) {

    const [gridApi, setGridApi] = useState()

    const onGridReady = (params:any) => {
        setGridApi(params)
    }

    const defaultColDef = useMemo(() => ({
        flex: 1,
        minWidth: 120,
        filter: 'agTextColumnFilter',
    }),[])

    return (
        <div className={[agGridStyles.customAGGridStyles,"ag-theme-alpine w-full h-full"].join(' ')}>
            <AgGridReact 
                onGridReady={onGridReady}
                rowData={rowData}
                columnDefs={columns}
                defaultColDef={defaultColDef}
                pagination={true}
                className='ag-theme-alpine-dark'
            />
        </div>
    )
}