'use client'

import dynamic from "next/dynamic"
import { useAppStore, RISKAI_DATA} from "../stores/app"
import { useEffect, useMemo, useState } from "react"
const Table = dynamic( () => import('../components/Table'), { ssr: false })

export default function Problem2() {

    const [tableData, setTableData] = useState([] as RISKAI_DATA[])
    
    const store = useAppStore()

    useEffect(() => {
        setTableData(store.tableData())
    },[store.decade, store.data])

    const colDef = useMemo(() => [
        { headerName: 'Asset Name', field: 'assetName', sortable: true},
        { headerName: 'Latitude', field: 'lat', sortable: true, filter: 'agNumberColumnFilter'},
        { headerName: 'Longitude', field: 'long', sortable: true, filter: 'agNumberColumnFilter'},
        { headerName: 'Business Category', field: 'businessCat', sortable: true, filter: 'ag'},
        { headerName: 'Risk Rating', field: 'riskRating', sortable: true, filter: 'agNumberColumnFilter'},
        { headerName: 'Year', field: 'year', sortable: true, filter: 'agSetColumnFilter'},
        ...store.riskFactorKeys()?.map((key:string) => ({
            headerName: key,
            field: `riskFactors.${key}`,
            filter: 'agNumberColumnFilter',
            minWidth: 120,
            sortable: true,
        }))
    ],[store.riskFactorKeys])

    return (
        <main className="w-full h-full flex flex-col items-center justify-between text-black overflow-auto">
            <h1>Problem 2</h1>
            <Table columns={colDef} rowData={tableData} />
        </main>
    )
}