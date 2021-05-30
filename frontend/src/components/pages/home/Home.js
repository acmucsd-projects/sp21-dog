import React from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import {
    TempContextProvider,
    useTempContext,
} from '../../../contexts/TempContext'
import GreetingCard from '../../cards/GreetingCard'
import HomepageList from './HomepageList'
import { useAuthContext } from '../../../contexts/AuthContext'

export default function Home() {
    const context = useAppContext()
    const tempContext = useTempContext()
    const auth = useAuthContext()

    React.useEffect(() => {
        fetch(
            `https://taskathon-go.herokuapp.com/api/users/user/${context.state.username}`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                navigator.geolocation.getCurrentPosition((position) => {
                    context.setState({
                        ...context.state,
                        userLocation: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        },
                        ...data,
                    })
                    tempContext.setState({ ...tempContext.state, ...data })
                })
            })
            .catch((err) => {
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
