import React, { useState } from 'react'

const AppContext = React.createContext()

function AppContextProvider({ children }) {
    const [state, setState] = useState({
        fetchError: false,
        displayName: '',
        username: '',
        email: '',
        bio: '',
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
