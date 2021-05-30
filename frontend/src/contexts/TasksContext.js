import React, { useState } from 'react'

const TasksContext = React.createContext()

function TasksContextProvider({ children }) {
    const [state, setState] = useState({
        tasks: null,
    })
    const value = { state, setState }

    return (
        <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
    )
}

function useTasksContext() {
    const context = React.useContext(TasksContext)
    if (context === undefined) {
        throw new Error(
            'useTasksContext must be used within a TasksContextProvider'
        )
    }
    return context
}

export { TasksContextProvider, useTasksContext }
