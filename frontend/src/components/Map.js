import ReactMapGl from 'react-map-gl'

import { useState } from 'react'
const Map = () => {
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: 37.75,
        longitude: -122.43,
        zoom: 8,
    })

    return (
        <div style={{ flex: 1 }}>
            <ReactMapGl
                {...viewport}
                onViewportChange={(newViewport) =>
                    setViewport({
                        ...newViewport,
                        width: '100%',
                        height: '100%',
                    })
                }
                mapboxApiAccessToken="pk.eyJ1IjoibmlzaGFudGJhbGFqaSIsImEiOiJja2xkOGl3cjcxc21yMndtdmxtZWpxeGRuIn0.isOPq2BjpvuzwjZMXW1yWA"
            />
        </div>
    )
}

export default Map
