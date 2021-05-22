import React from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import { useTempContext } from '../../../contexts/TempContext'
import GreetingCard from '../../cards/GreetingCard'
import HomepageList from './HomepageList'

export default function Home() {
    const context = useAppContext()

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            context.setState({
                ...context.state,
                userLocation: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                },
            })
        })
    }, [])

    return (
        <div style={{ width: '100%' }}>
            <button
                onClick={() => {
                    console.log(context.state)
                }}
            >
                click
            </button>
            <div style={{ margin: '10px' }}>
                <div style={{ marginBottom: '23px' }}>
                    <GreetingCard />
                </div>
                <HomepageList />
            </div>
        </div>
    )
}
