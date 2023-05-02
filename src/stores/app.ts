import { create } from 'zustand'

const BASE_URL = 'http://localhost:3000' //process.env.BASE_URL //?? "https://www.site.com"

export interface AppState {
    data: RISKAI_DATA[];
    filterTheData: () => any[];
    filteredMapData: any[];
    fetchData: () => void;
    init: () => void;
    decade: number | undefined;
    decades: any[];
    setDecade: (decade: number) => void;

    dataProcess_assetNames: (lat: number, long: number) => string[];
    dataProcess_businessCats: (lat: number, long: number) => string[];
    dataProcess_avgRiskRating: (lat: number, long: number) => number;
    dataProcess_avgRiskFactors: (lat: number, long: number) => {};
}


// TODO: Integrate proper display titles e.g. "Business Category"
export interface RISKAI_DATA {
    assetName: string;
    lat: number;
    long: number;
    businessCat: string;
    riskRating: number;
    riskFactors: Record<string, number>;
    year: number;
}

export const useAppStore = create<AppState>()((set, get) => ({

    filteredMapData: [],
    data: [],
    decade: undefined,
    decades: [],

    async init() {
        await get().fetchData()
    },

    async fetchData() {
        try {
            const response = await fetch(BASE_URL + '/api/riskai_data')
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

            // Filter the data for use in app
            // TODO: Ideally we don't do this, instead we want this func available globally.
            // There is a reactivity issue to overcome with regard to Zustand. For now we do this way.
            set({ filteredMapData: this.filterTheData() })

        } catch (error) {
            console.error('Error fetchData():', error)
        }
    },

    setDecade(decade: number) { // TODO: Reference "decade" declared in AppState rather then setting 'number' here.
        set({ decade: decade })
        set({ filteredMapData: this.filterTheData() })
    },

    filterTheData() {

        let work = []
        let decade = get().decade

        // Converge unique lat/long's, filtered by decade (in case a given lat/long doesn't have data for given decade)
        let latLongs = [...Array.from(new Set(get().data.filter(x => x.year && x.year == decade).map(x => {
                return x.lat.toString() + "," + x.long.toString()
        }))).sort()]

        // Assemble final data object for each lat/long
        work = latLongs.map((y:any) => {
            if (y) {
                const lat = parseFloat(y.split(",")[0])
                const long = parseFloat(y.split(",")[1])
                if (lat && long) {
                    return {
                        assetNames : this.dataProcess_assetNames(lat, long),
                        businessCat : this.dataProcess_businessCats(lat, long),
                        riskRating : this.dataProcess_avgRiskRating(lat, long),
                        riskFactors : this.dataProcess_avgRiskFactors(lat, long),
                        year: decade,
                        lat: lat,
                        long: long
                    }
                }
            }
        })

        //console.log("filterTheData work ios %O", work)

        /*
        work = get().data.filter( x =>
            x.year === get().decade
        )
        */
        
        /*
        TODO: Ideally this func has a return so we can call on it directly in any component,
        however, have not been able to make good reactivity with this method. Instead we apply
        the filtered data to another state element, and that is what we watch for updates and pull, throughout the app.
        */
        return work

    },

    dataProcess_assetNames(lat: number, long: number) {
        return Array.from(new Set(get().data.filter((x) => x.year >= get().decade! && x.year < (get().decade! + 10) && x.lat === lat && x.long === long).map((y) => y.assetName)))
    },

    dataProcess_businessCats(lat: number, long: number) {
        return Array.from(new Set(get().data.filter((x) => x.year >= get().decade! && x.year < (get().decade! + 10) && x.lat === lat && x.long === long).map((y) => y.businessCat)))
    },

    dataProcess_avgRiskRating(lat: number, long: number) {
        const dataFiltered = get().data.filter((x) => x.year >= get().decade! && x.year < (get().decade! + 10) && x.lat === lat && x.long === long)
        if (dataFiltered.length > 0) {
            return dataFiltered.reduce((accumulator, x) => accumulator + x.riskRating, 0) / dataFiltered.length
        }
        return 0
    },


    dataProcess_avgRiskFactors(lat: number, long: number) {
        const dataFiltered = get().data.filter((x) => x.year >= get().decade! && x.year < (get().decade! + 10) && x.lat === lat && x.long === long)
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


}))