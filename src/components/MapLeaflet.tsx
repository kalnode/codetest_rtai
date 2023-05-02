'use client'

import { useEffect, useLayoutEffect, useRef} from 'react'
import { useAppStore } from "../stores/app"
import { RISKAI_DATA } from "../stores/app"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { debounce } from "../scripts/utils"

// --------------------
// ICONS
// --------------------

let iconSVG = `<svg width="100%" height="100%" fill="currentColor" version="1.1" viewBox="0 0 99.868 146.54" xmlns="http://www.w3.org/2000/svg">
<path d="M 49.934,0 C 22.356,0 0,22.355 0,49.934 0,83.071 16.801,109.2 49.934,146.536 83.071,109.2 99.868,83.071 99.868,49.934 99.868,22.356 77.513,0 49.934,0 Z" />
</svg>`

// TODO: Declare base icon with common size then make instances of it and change the file name.
// This method has TS warnings to iron out. Using below method in meantime.

/*
const baseIcon = L.DivIcon.extend({
    html: "<div style='color:red'>"+iconSVG+"</div>",
    className: "mapMarker_riskai",
    iconSize: [28,28] //new L.Point(40, 40)
})
const iconsIdeal = {
    red: new baseIcon({html: "<div style='color:red'>"+iconSVG+"</div>"}),
    orange: new baseIcon({html: "<div style='color:orange'>"+iconSVG+"</div>"}),
    yellow: new baseIcon({html: "<div style='color:yellow'>"+iconSVG+"</div>"})
}
*/

const icons = {
    red: new L.DivIcon({
        html: "<div style='color:red'>"+iconSVG+"</div>",
        className: "mapMarker_riskai",
        iconSize: [28,28] //new L.Point(40, 40)
    }),

    orange: new L.DivIcon({
        html: "<div style='color:orange'>"+iconSVG+"</div>",
        className: "mapMarker_riskai",
        iconSize: [28,28] //new L.Point(40, 40)
    }),

    yellow: new L.DivIcon({
        html: "<div style='color:yellow'>"+iconSVG+"</div>",
        className: "mapMarker_riskai",
        iconSize: [28,28] //new L.Point(40, 40)
    })
}

let mapEl: any
let map: any
let markerFilters: any
let layer_markers = L.layerGroup([])
let layer_tiles: any
let control_layers

let windowResizeEvent = debounce( () => {
        console.log("debounce map")
        map.invalidateSize()
}, 200)

let resizeListener = windowResizeEvent.bind(this)

export default function MapLeaftlet({mapData = [], mapFilters = []}:any) {

    const store = useAppStore()

    // MOUNT
    useEffect(() => {
        initMap()

        markerFilters = store.decades // // TODO: We want to use: mapFilters

        createMarkers(mapData)

        // UNMOUNT
        return () => {
            map.remove()
            window.removeEventListener('resize', resizeListener)
        }

    }, [])

    // PROP UPDATES
    useEffect( () => {

        // TODO: We want to use prop mapFilters but data is not passing for some reason.
        // For now: We get decades directly from global store.
        markerFilters = store.decades // TODO: We want to use: mapFilters
        createMarkers(mapData)
    }, [mapData, markerFilters] )

    return (
        <div className="w-full h-full">
            <div id="map" className="w-full h-full"></div>
        </div>
    )
}

function initMap() {
    mapEl = document.getElementById('map')

    layer_tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })

    map = L.map(mapEl, {
        center: [39.73, -104.99], // Denver
        zoom: 4, // Roughly USA
        layers: [layer_tiles, layer_markers]
    })

    control_layers = L.control.layers({
        "layer_markers": layer_markers
    }).addTo(map)

    map.on('click', onMapClick)

    window.addEventListener('resize', resizeListener)

    // RESIZE LISTENER
    /*
    window.addEventListener("resize", debounce( () => {
        console.log("debounce map")
        map.invalidateSize()
    }, 200))
    */

}

function onMapClick(e: object) {
    console.log("Map clicked! %O", e)
}

function markerClick(e: any) {
    console.log("marker clicked, e is: %O", e)
}

function clearLayer() {
    layer_markers.clearLayers()
}

function createMarkers(newData: RISKAI_DATA[]) {

    if (newData && newData.length > 0) {

        console.log("newData 22333 is: %O", newData)

        clearLayer()

        newData.forEach((value: RISKAI_DATA) => {

            if (value) {

                let markerIcon

                if (value.riskRating >= 0.5 ) {
                    markerIcon = icons.red
                } else if (value.riskRating >= 0.25) {
                    markerIcon = icons.orange
                } else {
                    markerIcon = icons.yellow
                }

                let popupMessage="<div class='map_popup overflow-hidden'><div class='overflow-auto' style='height:150px'><ul>"

                Object.entries(value).forEach(([key, value]) => {

                    popupMessage = popupMessage + "<li><div class='font-bold'>" + key + "</div><div>"
                    if (value.constructor.name === "Object") {
                        popupMessage = popupMessage + "<pre>" + JSON.stringify(value, null, 4) + "</pre>"
                    } else {
                        popupMessage = popupMessage + value
                    }
                    popupMessage = popupMessage + "</div></li>"
                })

                popupMessage= popupMessage + "</div></div>"

                let marker = L.marker([value.lat, value.long], {
                    icon: markerIcon
                }).bindPopup(popupMessage)

                layer_markers.addLayer(marker)
            }
        })

    }

}