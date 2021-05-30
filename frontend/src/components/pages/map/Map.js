import React from 'react'
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl'
import { useAppContext } from '../../../contexts/AppContext'
import { useLocationContext } from '../../../contexts/LocationContext'
import { useTasksContext } from '../../../contexts/TasksContext'

export default function MapView({ noDrag }) {
    const context = useAppContext()
    const tasksContext = useTasksContext()
    const locationContext = useLocationContext()

    let mapStyle = 'mapbox://styles/mapbox/streets-v11'
    if (context.state.mapOptions.mapLayers.mapType === 'satelite') {
        mapStyle = 'mapbox://styles/mapbox/satellite-streets-v11'
    }

    const [viewport, setViewport] = React.useState({
        width: '100%',
        height: '100%',
        latitude:
            locationContext.state.viewportLocation.latitude ||
            locationContext.state.userLocation.latitude,
        longitude:
            locationContext.state.viewportLocation.longitude ||
            locationContext.state.userLocation.longitude,
        zoom: 15,
    })

    const stats = ['Fitness', 'Nature', 'Knowledge', 'Community']

    React.useEffect(() => {
        if (locationContext.state.viewportLocation.latitude !== null) {
            const newLoc = locationContext.state.viewportLocation
            setViewport({
                ...viewport,
                latitude: newLoc.latitude,
                longitude: newLoc.longitude,
                transitionDuration: 500,
                transitionInterpolator: new FlyToInterpolator(),
            })
            locationContext.setState({
                ...locationContext.state,
                viewportLocation: { latitude: null, longitude: null },
            })
        }
    }, [locationContext.state.viewportLocation])

    return (
        <ReactMapGL
            {...viewport}
            onViewportChange={(newViewport) => {
                if (!noDrag) {
                    setViewport({
                        ...newViewport,
                        width: '100%',
                        height: '100%',
                    })
                }
            }}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
            mapStyle={mapStyle}
        >
            {tasksContext.state.tasks != null &&
                tasksContext.state.tasks.map((task, i) => {
                    return (
                        <Marker
                            key={task.id}
                            id={task.id}
                            latitude={task.latitude}
                            longitude={task.longitude}
                        >
                            <div className="marker">
                                <span>
                                    <img
                                        style={{
                                            transform: 'rotateZ(135deg)',
                                            width: '80%',
                                            height: '80%',
                                        }}
                                        src={`./icons/${
                                            stats[task.taskType]
                                        }.svg`}
                                        alt="map marker"
                                    />
                                </span>
                            </div>
                        </Marker>
                    )
                })}
        </ReactMapGL>
    )
}
