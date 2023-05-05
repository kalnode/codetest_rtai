import { RTAI_DATA } from "../../stores/app"
import { parse } from 'csv-parse'
import fs from 'fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'

interface data {
    data: RTAI_DATA[]
}

async function fetchData() {

    const rows: RTAI_DATA[] = []
    const csv = await fs.readFile('./assets/rtai_data.csv')
    const parser = parse(csv, { columns: true, skip_empty_lines: true })

    parser.on('readable', () => {
        let row
        while ((row = parser.read())) {
            const rowData: RTAI_DATA = {
                assetName: row["Asset Name"],
                lat: parseFloat(row["Lat"]),
                long: parseFloat(row["Long"]),
                businessCat: row["Business Category"],
                riskRating: parseFloat(row["Risk Rating"]),
                riskFactors: JSON.parse(row["Risk Factors"]) as Record<string, number>,
                year: parseInt(row["Year"])
            }
            rows.push(rowData)
        }
    })

    return new Promise<RTAI_DATA[]>((resolve, reject) => {
        parser.on("end", () => {
            resolve(rows)
        })
        parser.on("error", (error) => {
            reject(error)
        })
    })

}

export default async function handler( req: NextApiRequest, res: NextApiResponse<data>) {
    const rows = await fetchData()
    res.status(200).json({ data: rows })
}