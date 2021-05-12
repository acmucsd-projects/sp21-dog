import React from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

const mapboxApiKey = process.env.REACT_APP_MAPBOX_API_KEY
export default function MapView({ noDrag }) {
    const [viewport, setViewport] = React.useState({
        width: '100%',
        height: '100%',
        latitude: 37.75,
        longitude: -122.43,
        zoom: 15,
    })

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
            mapboxApiAccessToken={mapboxApiKey}
            mapStyle="mapbox://styles/mapbox/streets-v11"
        >
            <Marker latitude={37.75} longitude={-122.43}>
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
