import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title , CategoryScale, Tooltip, Legend} from 'chart.js'
import { useEffect } from 'react'

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend)

type ChartDataItem = {
    year: number;
    riskRating: number;
    count: number;
}

// TODO: Need to strip propriety elements here; the "Chart" component should only have generic elements.

export default function Chart({filteredChartData = [], labels = []}:any) {


        // MOUNT
        useEffect(() => {
            console.log("chart useEffect")
        }, [])

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Average of Risk Rating",
                data: Object.values<Record<number, ChartDataItem>>(
                    filteredChartData.reduce((acc: any, curr: any) => {
                        if (!acc[curr.year]) {
                            acc[curr.year] = { year: curr.year, riskRating: curr.riskRating, count: 1 }
                        } else {
                            acc[curr.year].riskRating += curr.riskRating
                            acc[curr.year].count++
                        }
                        return acc
                    }, {})
                ).map(({ year, riskRating, count }: any) => ({ x: year, y: riskRating / count })),
                borderColor: "#b12126",
                fill: false,
                pointRadius: 8,
                showLine: true
            },
            {
                label: "Risk Rating",
                data: filteredChartData.map((d:any) => {
                    return {
                        x: d.year,
                        y: d.riskRating
                    }
                }),
                borderColor: '#4a2eeb',
                fill: false,
                showLine:false
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const
            },
            title: {
                display: true,
                text: 'Risk Rating over time (Year)'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem: any) {
                        const assetName = filteredChartData[tooltipItem.dataIndex]?.assetName
                        const businessCategory = filteredChartData[tooltipItem.dataIndex]?.businessCat
                        return `${assetName} (${businessCategory})`
                    },
                    afterLabel: function(tooltipItem: any) {
                        const riskRating = tooltipItem.raw['y']
                        const returnArray = [`Risk Ratings: ${riskRating}`]
                        const riskFactors = filteredChartData[tooltipItem.dataIndex].riskFactors
                        Object.keys(riskFactors).forEach((key) => returnArray.push(
                            `${key} : ${riskFactors[key]}`
                        ))
                        const latLong = filteredChartData[tooltipItem.dataIndex].lat.toString()+ ","+ filteredChartData[tooltipItem.dataIndex].long.toString()
                        returnArray.push(latLong)
                        return returnArray
                    },
                    beforeLabel: function(tooltipItem: any) {
                        return tooltipItem.dataset.label
                    }
                }
            }
        }
    }

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <Line data={chartData} options={options}></Line>
        </div>
    )
}