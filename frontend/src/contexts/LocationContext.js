import React, { useState } from 'react'

const LocationContext = React.createContext()

function LocationContextProvider({ children }) {
    const [state, setState] = useState({
        userLocation: { latitude: 37.75, longitude: -122.43 },
        viewportLocation: { latitude: null, longitude: null },
    })
    const value = { state, setState }

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    )
}

function useLocationContext() {
    const context = React.useContext(LocationContext)
    if (context === undefined) {
        throw new Error(
            'useLocationContext must be used within a LocationContextProvider'
        )
    }
    return context
}

export { LocationContextProvider, useLocationContext }
