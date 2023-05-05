'use client'

import ChartComponent from "../components/Chart"
import { useAppStore } from "../stores/app"

export default function PageChart() {

    const store = useAppStore()

    return (
        <main className="w-full h-full flex flex-col items-center">
            <div className="flex flex-row py-2 px-2">
                <div className="flex mr-2 px-2 space-x-3">
                    <div className="">
                        <label htmlFor="assetName">Asset Names</label>
                        <select
                            id="assetName"
                            className="bg-gray-50 border border-gray-300 w-full text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
                            value={store.selectedAssetName ?? ''}
                            onChange={(e) => store.setAssetName(e.target.value)}>
                            {
                                store.assetNames()?.map((asset) => (
                                    <option key={asset} value={asset}>{asset}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="">
                        <label htmlFor="businessCategory">Business Categories</label>
                        <select
                            id="businessCategory"
                            className="bg-gray-50 border border-gray-300 w-full text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
                            value={store.selectedBusinessCategory ?? ''}
                            onChange={(e) => store.setBusinessCategory(e.target.value)}>
                            {
                                store.businessCategories()?.map((asset:any) => (
                                    <option key={asset} value={asset}>{asset}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="">
                        <label htmlFor="latLong">Locations:</label>
                        <select
                            id="latLong"
                            className="bg-gray-50 border border-gray-300 w-full text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
                            value={store.selectedLatLong ?? ''}
                            onChange={(e) => store.setLatLong(e.target.value)}>
                            {
                                store.latLongs()?.map((latLong) => (
                                    <option key={latLong} value={latLong}>{latLong}</option>
                                ))
                            }
                        </select>
                    </div>

                </div>
            </div>
            <ChartComponent filteredChartData={store.filteredChartData()} labels={store.decades} class="flex-1" />
        </main>
    )
}