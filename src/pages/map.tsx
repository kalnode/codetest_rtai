import dynamic from "next/dynamic"
import { useAppStore } from "../stores/app"
const Map = dynamic( () => import('../components/Map'), { ssr: false })

export default function PageMap() {

    const store = useAppStore()

    // WATCH DATA

    // Pass data into the map via prop, to maintain abstraction.

    // METHOD 1 - PRE-FILTERED (WORKS)
    // After fetch, we filter data and keep that in a separate store element.
    // Here we bind to this directly; and everything passes and works.
    // Downside: We have an extra store element holding data, which in theory is extraneous.
    const dataPreFiltered = useAppStore((state) => state.filteredMapData)
    const filters = useAppStore((state) => state.decades)

    // METHOD 2 - DYNAMICALLY-FILTERED (Not fully functional yet)
    // We dynamically filter data when a change to data is detected.
    // Main advantage here is that we don't keep extraneous data stores in our global store.
    // TODO: Still unsure of the best way to pass the dynamic filtering work. Results not 100%; needs testing.
    const dataDynamicallyFiltered = useAppStore(
        // TODO: Remove TS warnings.
        // TODO: Which way is best?
        // @ts-ignore
        //(state) => state.data, (oldData,newData) => doExtraProcessing(oldData,newData)
        //(state) => state.data, (state) => store.filterTheData
        //(state) => state.data, (state) => state.filterTheData
    )

    /*
    const testDecadesWork = useAppStore(
        // @ts-ignore
        (state) => state.decades, (oldData,newData) => doExtraProcessing(oldData,newData)
    )
    */


    return (
        <main className="w-full h-full flex flex-col items-center justify-between">
            <Map mapData={dataPreFiltered} mapFilters={filters} />
        </main>
    )
}

function doExtraProcessing(oldData:any,newData:any) {
    console.log("Problem1 doExtraProcessing() oldData:" + oldData)
    console.log("Problem1 doExtraProcessing() newData" + newData)
}