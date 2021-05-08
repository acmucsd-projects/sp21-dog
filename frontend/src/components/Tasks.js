import React from 'react'
import { Color } from '../helpers/Color'
import FloatingActionButton from './FloatingActionButton'
import TasksList from './TasksList'
import Map from './Map'
import { useAppContext } from '../contexts/AppContext'

export default function Tasks() {
    const context = useAppContext()

    return (
        <div class="overflow-container">
            {context.state.mapOpen ? (
                <>
                    <Map />
                    <div className="float">
                        <FloatingActionButton
                            imgSrc="./icons/journal.svg"
                            onClick={() => {
                                context.setState({
                                    ...context.state,
                                    mapOpen: false,
                                })
                            }}
                        />
                    </div>
                </>
            ) : (
                <div style={{ width: '100%', padding: '0 10px' }}>
                    <TasksList />
                    <div className="float">
                        <FloatingActionButton
                            imgSrc="./icons/map.svg"
                            onClick={() => {
                                context.setState({
                                    ...context.state,
                                    mapOpen: true,
                                })
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
