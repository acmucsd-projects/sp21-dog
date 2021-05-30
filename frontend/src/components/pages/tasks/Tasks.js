import React from 'react'
import TasksList from './TasksList'
import Map from '../map/Map'
import { useAppContext } from '../../../contexts/AppContext'
import FloatingActionButton from '../../buttons/FloatingActionButton'
import MapViewTask from '../map/MapViewTask'
import CustomDialog from '../../modals/CustomDialog'
import { useAuthContext } from '../../../contexts/AuthContext'
import { useTasksContext } from '../../../contexts/TasksContext'
import { useLocationContext } from '../../../contexts/LocationContext'

export default function Tasks() {
    const [layersOpen, setLayersOpen] = React.useState(false)
    const context = useAppContext()
    const auth = useAuthContext()
    const tasksContext = useTasksContext()
    const locationContext = useLocationContext()

    const handleCenterCamera = () => {
        locationContext.setState({
            ...locationContext.state,
            viewportLocation: locationContext.state.userLocation,
        })
    }

    React.useEffect(() => {
        if (
            tasksContext.state.tasks == null ||
            tasksContext.state.tasks.length === 0
        ) {
            fetch(
                `https://taskathon-go.herokuapp.com/api/game/generate?latitude=${locationContext.state.userLocation.latitude}&longitude=${locationContext.state.userLocation.longitude}`,
                {
                    method: 'GET',
                    headers: new Headers({
                        Authorization: 'Bearer ' + auth.state.token,
                    }),
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    tasksContext.setState({
                        ...tasksContext.state,
                        tasks: data,
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [])

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
                        <FloatingActionButton
                            imgSrc="./icons/maparrow.svg"
                            onClick={() => {
                                handleCenterCamera()
                            }}
                        />
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
                    <TasksList tasks={tasksContext.state.tasks} />
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
