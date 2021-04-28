import React, { useState } from 'react'
import { Page } from '../helpers/Page'

const AppContext = React.createContext()

function AppContextProvider({ children }) {
    const [state, setState] = useState({
        page: Page.tasks,
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
