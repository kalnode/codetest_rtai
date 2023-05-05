import { create } from 'zustand'

const BASE_URL = 'http://localhost:3000' //process.env.BASE_URL //?? "https://www.site.com"
const NONE_STRING = "None"


export interface AppState {
    data: RTAI_DATA[];
    filterTheData: () => any[];
    fetchData: () => void;
    init: () => void;
    decade: number | undefined;
    decades: any[];
    setDecade: (decade: number) => void;

    // MAP STUFF
    filteredMapData: any[];

    // TABLE STUFF
    riskFactorKeys: () => string[];
    tableData: () => RTAI_DATA[];
    dataProcess_assetNames: (lat: number, long: number) => string[];
    dataProcess_businessCats: (lat: number, long: number) => string[];
    dataProcess_avgRiskRating: (lat: number, long: number) => number;
    dataProcess_avgRiskFactors: (lat: number, long: number) => {};

    // CHART STUFF
    filteredChartData: () => any[];
    latLongs: () => any[];
    setLatLong: (latLongString: string) => void;
    latLongStringParser: (lat: number, long: number) => string;
    selectedLatLong: string;
    businessCats: () => any[];
    setBusinessCat: (category: string) => void;
    selectedBusinessCategory: string;
    assetNames: () => any[];
    setAssetName: (value: string) => void;
    selectedAssetName: string;
}


// TODO: Integrate proper display titles e.g. "Business Category"
export interface RTAI_DATA {
    assetName: string;
    lat: number;
    long: number;
    businessCat: string;
    riskRating: number;
    riskFactors: Record<string, number>;
    year: number;
}


export const useAppStore = create<AppState>()((set, get) => ({

    // -----------------------------
    // SETUP DATA
    // -----------------------------

    // GENERAL
    data: [],
    decade: undefined,
    decades: [],

    // MAP
    filteredMapData: [],

    // Chart stuff (select elements)
    selectedBusinessCategory: null as unknown as string,
    selectedAssetName: null as unknown as string,
    selectedLatLong: null as unknown as string,


    // -----------------------------
    // FUNCTIONS
    // -----------------------------

    async init() {
        await get().fetchData()
    },

    async fetchData() {
        try {
            const response = await fetch(BASE_URL + '/api/rtai_data')
            if (!response.ok) {
                throw new Error('Error fetching risk data')
            }
            const { data } = await response.json()

            // Store data in our global
            set({ data: data })

            // Find & set all possible decades from data
            // TODO: This update isn't being reflected across the app when using Zustand component bindings; why?
            set({ decades: Array.from(new Set(get().data.map(x => { return x!.year }))).sort() })

            // Set initial decade to whatever is first in decades
            set({ decade: get().decades[0]})

            set({ selectedAssetName: get().assetNames()[1]})

            // Filter the data for use in app
            // TODO: Ideally we don't do this, instead we want this func available globally.
            // There is a reactivity issue to overcome with regard to Zustand. For now we do this way.
            set({ filteredMapData: get().filterTheData() })

        } catch (error) {
            console.error('Error fetchData():', error)
        }
    },

    setDecade(decade: number) { // TODO: Reference "decade" declared in AppState rather then setting 'number' here.
        set({ decade: decade })
        set({ filteredMapData: get().filterTheData() })
    },

    filterTheData() {

        let work = []
        let decade = get().decade

        // Converge unique lat/long's, filtered by decade (in case a given lat/long doesn't have data for given decade)
        let latLongs = [...Array.from(new Set(get().data.filter( x => x.year && x.year == decade).map( y => {
                return y.lat.toString() + "," + y.long.toString()
        }))).sort()]

        // Assemble final data object for each lat/long
        work = latLongs.map((z:any) => {
            if (z) {
                const lat = parseFloat(z.split(",")[0])
                const long = parseFloat(z.split(",")[1])
                if (lat && long) {
                    return {
                        assetNames : get().dataProcess_assetNames(lat, long),
                        businessCat : get().dataProcess_businessCats(lat, long),
                        riskRating : get().dataProcess_avgRiskRating(lat, long),
                        riskFactors : get().dataProcess_avgRiskFactors(lat, long),
                        year: decade,
                        lat: lat,
                        long: long
                    }
                }
            }
        })

        return work

    },

    dataProcess_assetNames(lat: number, long: number) {
        return Array.from(new Set(get().data.filter( x => x.year >= get().decade! && x.year < (get().decade! + 10) && x.lat === lat && x.long === long).map((y) => y.assetName)))
    },

    dataProcess_businessCats(lat: number, long: number) {
        return Array.from(new Set(get().data.filter( x => x.year >= get().decade! && x.year < (get().decade! + 10) && x.lat === lat && x.long === long).map((y) => y.businessCat)))
    },

    dataProcess_avgRiskRating(lat: number, long: number) {
        const dataFiltered = get().data.filter( x => x.year >= get().decade! && x.year < (get().decade! + 10) && x.lat === lat && x.long === long)
        if (dataFiltered.length > 0) {
            return dataFiltered.reduce((accumulator, x) => accumulator + x.riskRating, 0) / dataFiltered.length
        }
        return 0
    },

    dataProcess_avgRiskFactors(lat: number, long: number) {
        const dataFiltered = get().data.filter( x => x.year >= get().decade! && x.year < (get().decade! + 10) && x.lat === lat && x.long === long)
        const result: Record<string, { total: number, count: number }> = {}

        dataFiltered.forEach((item) => {
            const { riskFactors } = item
            Object.entries(riskFactors).forEach(([factor, value]) => {
                if (!result[factor]) {
                    result[factor] = { total: 0, count: 0 }
                }
                result[factor].total += value
                result[factor].count += 1
            })
        })

        const avgResult: Record<string, number> = {}
        Object.entries(result).forEach(([factor, { total, count }]) => {
            avgResult[factor] = total / count
        })

        return avgResult
    },

    riskFactorKeys() {
        if (get().data && get().data.length > 0) {
            let work = Object.keys(get().data.reduce((accumulator, item) => {
                if (Object.keys(item.riskFactors).length > Object.keys(accumulator.riskFactors).length) {
                    return item
                }
                return accumulator
            }).riskFactors)
            return work
        }
        return []
    },

    tableData() {
        return get().data.filter( x => x.year === get().decade)
    },


    // Chart stuff
    setAssetName(name: string) {
        set({ selectedAssetName: name })
    },

    setBusinessCat(category: string) {
        set({ selectedBusinessCategory: category })
    },

    setLatLong(latLongString: string) {
        set({ selectedLatLong: latLongString })
    },

    businessCats() {
        return [...Array.from(new Set(get().data.map( x => {
            return x.businessCat
        }))).sort()]
    },

    assetNames() {
        return [...Array.from(new Set(get().data.map( x => {
            return x.assetName
        }))).sort()]
    },

    filteredChartData() {
        let work = []
        work = get().data.filter( x => {
            if (get().selectedAssetName && get().selectedAssetName !== NONE_STRING && get().selectedAssetName !== x.assetName) {
                return false
            }
            if (get().selectedBusinessCategory && get().selectedBusinessCategory !== NONE_STRING && get().selectedBusinessCategory !== x.businessCat) {
                return false
            }
            if (get().selectedLatLong && get().selectedLatLong !== NONE_STRING && get().selectedLatLong !== get().latLongStringParser(x.lat, x.long)) {
                return false
            }
            return true
        })
        return work
    },

    latLongs() {
        return [...Array.from(new Set(get().data.map( x => {
            return x.lat.toString() + "," + x.long.toString()
        }))).sort()]
    },

    latLongStringParser(lat: number, long: number) {
        const parsed = lat.toString() + "," + long.toString()
        return parsed
    }

}))