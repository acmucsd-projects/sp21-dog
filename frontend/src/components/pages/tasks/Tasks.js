import React from 'react'
import TasksList from './TasksList'
import Map from '../map/Map'
import { useAppContext } from '../../../contexts/AppContext'
import FloatingActionButton from '../../buttons/FloatingActionButton'
import MapViewTask from '../map/MapViewTask'
import CustomDialog from '../../modals/CustomDialog'

export default function Tasks() {
    const [layersOpen, setLayersOpen] = React.useState(false)

    const context = useAppContext()
    let offset = 0
    if (context.state.desktopView) {
        offset = -15
    }

    if (context.state.desktopView) {
        return (
            <div
                className="overflow-container"
                style={{ position: 'absolute' }}
            >
                <CustomDialog
                    type="mapLayers"
                    open={layersOpen}
                    setOpen={setLayersOpen}
                    keyName={'mapOptions'}
                />
                <div style={{ width: '100%', padding: '0 10px' }}>
                    <TasksList />
                    {!context.state.desktopView && (
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
                    )}
                </div>
                <Map />
                {!context.state.desktopView && (
                    <div
                        className="float"
                        style={{
                            right: '3%',
                            bottom: `${15 + offset}%`,
                        }}
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
                )}
                <div
                    className="float"
                    style={{
                        right: '3%',
                        bottom: `${24 + offset}%`,
                    }}
                >
                    <FloatingActionButton imgSrc="./icons/maparrow.svg" />
                </div>
                <div
                    className="float"
                    style={{
                        right: '3%',
                        bottom: `${33 + offset}%`,
                    }}
                >
                    <FloatingActionButton
                        imgSrc="./icons/layers.svg"
                        onClick={() => {
                            setLayersOpen(true)
                        }}
                    />
                </div>
                {!context.state.desktopView && (
                    <div
                        className="float"
                        style={{ bottom: '13%', width: '83%' }}
                    >
                        <MapViewTask />
                    </div>
                )}
            </div>
        )
    }
    return (
        <div className="overflow-container">
            <CustomDialog
                type="mapLayers"
                open={layersOpen}
                setOpen={setLayersOpen}
                keyName={'mapOptions'}
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
