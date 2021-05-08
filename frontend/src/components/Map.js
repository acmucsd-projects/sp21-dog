import React from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

const mapboxApiKey =
    'pk.eyJ1IjoibmlzaGFudGJhbGFqaSIsImEiOiJja2xkOGl3cjcxc21yMndtdmxtZWpxeGRuIn0.isOPq2BjpvuzwjZMXW1yWA'

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
                    <span></span>
                </div>
            </Marker>
        </ReactMapGL>
    )
}
