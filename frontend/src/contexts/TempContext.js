import React, { useState } from 'react'

const TempContext = React.createContext()

function TempContextProvider({ children }) {
    const [state, setState] = useState({
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
