import React, { useState } from 'react'

const AuthContext = React.createContext()

function AuthContextProvider({ children }) {
    const [state, setState] = useState({
        token: null,
    })
    const value = { state, setState }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuthContext() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error(
            'useAuthContext must be used within a AuthContextProvider'
        )
    }
    return context
}

export { AuthContextProvider, useAuthContext }
