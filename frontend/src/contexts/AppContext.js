import React, { useState } from 'react'

const AppContext = React.createContext()

function AppContextProvider({ children }) {
    const [state, setState] = useState({})
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
