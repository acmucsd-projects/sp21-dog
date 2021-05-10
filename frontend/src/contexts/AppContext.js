import React, { useState } from 'react'
import { Page } from '../helpers/Page'

const AppContext = React.createContext()

function AppContextProvider({ children }) {
    const [state, setState] = useState({
        page: Page.home,
        displayName: 'Elizabeth',
        username: '@lizzyh2021',
        bio:
            'Hey there!!\nMy name is Elizabeth and I love going out on adventures! When I’m not out hiking or mountain climbing, I like to hangout with friends at the park. Everyone should always enjoy nature at some point during their day!',
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
