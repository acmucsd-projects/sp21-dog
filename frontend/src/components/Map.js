import ReactMapGl from 'react-map-gl'
import { useEffect } from 'react'

import { useState } from 'react'
const Map = () => {
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: 37.75,
        longitude: -122.43,
        zoom: 8,
    })
    const handleWindowResize = () => {
        setViewport({ ...viewport })
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    return (
        <>
            <ReactMapGl
                {...viewport}
                onViewportChange={(v) => setViewport(v)}
                mapboxApiAccessToken="pk.eyJ1IjoibmlzaGFudGJhbGFqaSIsImEiOiJja2xkOGl3cjcxc21yMndtdmxtZWpxeGRuIn0.isOPq2BjpvuzwjZMXW1yWA"
            />
        </>
    )
}

export default Map
