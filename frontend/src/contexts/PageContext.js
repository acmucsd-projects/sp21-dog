import React, { useState } from 'react'

const PageContext = React.createContext()

function PageContextProvider({ children }) {
    const [state, setState] = useState({
        page: 'landing',
        mapOpen: false,
    })
    const value = { state, setState }

    return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

function usePageContext() {
    const context = React.useContext(PageContext)
    if (context === undefined) {
        throw new Error(
            'usePageContext must be used within a PageContextProvider'
        )
    }
    return context
}

export { PageContextProvider, usePageContext }
