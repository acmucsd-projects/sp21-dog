import React, { useState } from 'react'
import { Page } from '../helpers/Page'

const AppContext = React.createContext()

function AppContextProvider({ children }) {
    const [state, setState] = useState({
        page: Page.home,
        mapOpen: false,
        displayName: 'Elizabeth',
        username: 'lizzyh2021',
        email: 'lizzyh2021@gmail.com',
        password: 'thisshouldnotbeinplaintext',
        region: 'United States',
        bio:
            'Hey there!!\nMy name is Elizabeth and I love going out on adventures! When I’m not out hiking or mountain climbing, I like to hangout with friends at the park. Everyone should always enjoy nature at some point during their day!',
        userLocation: { latitude: 37.75, longitude: -122.43 },
        viewportLocation: { latitude: null, longitude: null },
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
                mapType: 'default',
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
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

function useAppContext() {
    const context = React.useContext(AppContext)
    if (context === undefined) {
        throw new Error(
            'useAppContext must be used within a AppContextProvider'
        )
    }
    return context
}

export { AppContextProvider, useAppContext }
