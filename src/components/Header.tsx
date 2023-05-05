import Link from "next/link"
import { useAppStore } from "../stores/app"

export default function Header() {

    const store = useAppStore()

    return (
        <header className="w-full flex flex-col sm:flex-row items-center p-3 px-2 sm:px-8 text-white bg-slate-800 space-x-3 sm:space-x-4">

            <div className="sm:mr-8 mb-4 sm:mb-0">
                <h1 className="text-2xl text-center whitespace-nowrap">RTAI Code Test</h1>
            </div>

            <nav className="flex sm:justify-end space-x-3 sm:space-x-4 text-sm sm:text-base whitespace-nowrap">
                <Link href="/">
                    Home
                </Link>
                <Link href="/map">
                    Map
                </Link>
                <Link href="/table">
                    Table
                </Link>
                <Link href="/chart">
                    Chart
                </Link>
            </nav>

            <select value={store.decade} onChange={(e) => store.setDecade(parseInt(e.target.value))} className="bg-gray-800 text-white p-2 rounded cursor-pointer border border-gray-500 hover:bg-gray-700">
                {store.decades.map((decade) => (
                    <option key={decade} value={decade}>{decade}</option>
                ))}
            </select>

        </header>
    )

    /*
    DAISYUI SELECT
        <select value={store.decade} onChange={(e) => store.setDecade(parseInt(e.target.value))} className="select select-bordered w-full max-w-xs">
        <option disabled selected>Choose decade</option>
        {store.decades.map((decade) => (
            <option key={decade} value={decade}>{decade}</option>
        ))}
    </select>
    */
}