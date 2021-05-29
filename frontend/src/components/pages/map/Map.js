import React from 'react'
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAppContext } from '../../../contexts/AppContext'

export default function MapView({ noDrag }) {
    const context = useAppContext()

    let mapStyle = 'mapbox://styles/mapbox/streets-v11'
    if (context.state.mapOptions.mapLayers.mapType === 'satelite') {
        mapStyle = 'mapbox://styles/mapbox/satellite-streets-v11'
    }

    const [viewport, setViewport] = React.useState({
        width: '100%',
        height: '100%',
        latitude:
            context.state.viewportLocation.latitude ||
            context.state.userLocation.latitude,
        longitude:
            context.state.viewportLocation.longitude ||
            context.state.userLocation.longitude,
        zoom: 15,
    })

    React.useEffect(() => {
        if (context.state.viewportLocation.latitude !== null) {
            const newLoc = context.state.viewportLocation
            setViewport({
                ...viewport,
                latitude: newLoc.latitude,
                longitude: newLoc.longitude,
                transitionDuration: 500,
                transitionInterpolator: new FlyToInterpolator(),
            })
            context.setState({
                ...context.state,
                viewportLocation: { latitude: null, longitude: null },
            })
        }
    }, [context.state.viewportLocation])

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
            <Marker
                latitude={context.state.userLocation.latitude}
                longitude={context.state.userLocation.longitude}
            >
                <div className="marker">
                    <span>
                        <img
                            style={{
                                transform: 'rotateZ(135deg)',
                                width: '80%',
                                height: '80%',
                            }}
                            src="./icons/nature.svg"
                            alt="map marker"
                        />
                    </span>
                </div>
            </Marker>
        </ReactMapGL>
    )
}
