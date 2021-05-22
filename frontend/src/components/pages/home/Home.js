import React from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import { useTempContext } from '../../../contexts/TempContext'
import GreetingCard from '../../cards/GreetingCard'
import HomepageList from './HomepageList'
import { useAuthContext } from '../../../contexts/AuthContext'

export default function Home() {
    const context = useAppContext()
    const auth = useAuthContext()

    const refreshableFetch = (url, init) => {
        const TOKEN_REFRESH_INTERVAL = 900000 // fifteen minutes
        let timeout = null

        clearTimeout(timeout)

        timeout = setTimeout(
            () =>
                refreshableFetch(
                    'https://taskathon-go.herokuapp.com/api/auth/refresh',
                    {
                        headers: new Headers({
                            authorization: 'Bearer ' + auth.state.token,
                            credentials: 'include',
                        }),
                    }
                )
                    .then((response) => response.json)
                    .then((data) => {
                        auth.setState({ ...auth.state, token: data.jwt })
                    })
                    .then((err) => {
                        console.log(err)
                    }),
            TOKEN_REFRESH_INTERVAL
        )

        return fetch(url, init)
    }

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

        refreshableFetch('https://taskathon-go.herokuapp.com/api/auth/refresh')
            .then((response) => response.json)
            .then((data) => {
                auth.setState({ ...auth.state, token: data.jwt })
            })
            .then((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div style={{ width: '100%' }}>
            <div style={{ margin: '10px' }}>
                <div style={{ marginBottom: '23px' }}>
                    <GreetingCard />
                </div>
                <HomepageList />
            </div>
        </div>
    )
}
