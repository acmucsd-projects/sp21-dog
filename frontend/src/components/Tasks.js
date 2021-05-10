import React from 'react'
import { Color } from '../helpers/Color'
import TasksList from './TasksList'
import Map from './Map'
import { useAppContext } from '../contexts/AppContext'
import FloatingActionButton from './FloatingActionButton'
import AvatarCard from './AvatarCard'
import { Page } from '../helpers/Page'
import { Paper } from '@material-ui/core'
import TaskListItem from './TaskListItem'
import MapViewTask from './MapViewTask'
import CustomDialog from './CustomDialog'

export default function Tasks() {
    const [layersOpen, setLayersOpen] = React.useState(false)

    const context = useAppContext()
    return (
        <div class="overflow-container">
            <CustomDialog
                type="mapLayers"
                open={layersOpen}
                setOpen={setLayersOpen}
            />
            {context.state.mapOpen ? (
                <>
                    <Map />
                    <div
                        className="float"
                        style={{ right: '3%', bottom: '15%' }}
                    >
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
                    <div
                        className="float"
                        style={{ right: '3%', bottom: '24%' }}
                    >
                        <FloatingActionButton imgSrc="./icons/maparrow.svg" />
                    </div>
                    <div
                        className="float"
                        style={{ right: '3%', bottom: '33%' }}
                    >
                        <FloatingActionButton
                            imgSrc="./icons/layers.svg"
                            onClick={() => {
                                setLayersOpen(true)
                            }}
                        />
                    </div>
                    <div
                        className="float"
                        style={{ bottom: '13%', width: '83%' }}
                    >
                        <MapViewTask />
                    </div>
                </>
            ) : (
                <div style={{ width: '100%', padding: '0 10px' }}>
                    <TasksList />
                    <div
                        className="float"
                        style={{ right: '3%', bottom: '15%' }}
                    >
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
