import React, { useState } from 'react'
import { Page } from '../helpers/Page'

const TempContext = React.createContext()

function TempContextProvider({ children }) {
    const [state, setState] = useState({
        page: Page.home,
        mapOpen: false,
        displayName: 'Elizabeth',
        username: 'lizzyh2021',
        email: 'lizzyh2021@gmail.com',
        region: 'United States',
        bio:
            'Hey there!!\nMy name is Elizabeth and I love going out on adventures! When I’m not out hiking or mountain climbing, I like to hangout with friends at the park. Everyone should always enjoy nature at some point during their day!',
        leaderboardOptions: {
            view: {
                displayData: 'points',
                timePeriod: 'week',
            },
            filter: {
                community: false,
                knowledge: false,
                nature: false,
                fitness: false,
                'show all': true,
            },
        },
        tasksOptions: {
            sort: { sortBy: 'type', ascending: false },
            filter: {
                community: false,
                knowledge: false,
                nature: false,
                fitness: false,
                'show all': true,
            },
        },
        mapOptions: {
            mapLayers: {
                mapType: 'hybrid',
            },
        },
        journalOptions: {
            view: {
                displayData: 'points',
                timePeriod: 'week',
            },
        },
    })
    const value = { state, setState }
    return <TempContext.Provider value={value}>{children}</TempContext.Provider>
}

function useTempContext() {
    const context = React.useContext(TempContext)
    if (context === undefined) {
        throw new Error(
            'useTempContext must be used within a TempContextProvider'
        )
    }
    return context
}

export { TempContextProvider, useTempContext }
