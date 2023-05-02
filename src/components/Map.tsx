/* MAP ABSTRACTION */

import MapLeaflet from './MapLeaflet'

export default function Map ({mapData}: any, {mapFilters}: any) {
    return (
        <div className="w-full h-full flex justify-center items-center ">
            <MapLeaflet mapData={mapData} mapFilters={mapFilters} />
        </div>
    )
}