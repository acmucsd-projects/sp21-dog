import React from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import {
    TempContextProvider,
    useTempContext,
} from '../../../contexts/TempContext'
import GreetingCard from '../../cards/GreetingCard'
import HomepageList from './HomepageList'
import { useAuthContext } from '../../../contexts/AuthContext'
import { useTasksContext } from '../../../contexts/TasksContext'
import { objToFormData } from '../../../helpers/Utils'
import { useLocationContext } from '../../../contexts/LocationContext'

export default function Home() {
    const context = useAppContext()
    const tempContext = useTempContext()
    const tasksContext = useTasksContext()
    const auth = useAuthContext()
    const locationContext = useLocationContext()

    React.useEffect(() => {
        if (auth.state.token) {
            fetch(
                `https://taskathon-go.herokuapp.com/api/users/user/${context.state.username}`
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    navigator.geolocation.watchPosition(function (position) {
                        context.setState({
                            ...context.state,
                            ...data,
                        })
                        /*locationContext.setState({
                            ...locationContext.state,
                            userLocation: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            },
                            viewportLocation: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            },
                        })*/
                        tempContext.setState({ ...tempContext.state, ...data })
                        fetch(
                            `https://taskathon-go.herokuapp.com/api/users/user/${context.state.username}/tasks`,
                            {
                                method: 'GET',
                                headers: new Headers({
                                    Authorization: 'Bearer ' + auth.state.token,
                                }),
                            }
                        )
                            .then((response) => response.json())
                            .then((data) => {
                                if (data.length > 0) {
                                    if (data.length > 20) {
                                        data = data.slice(0, 20)
                                    }
                                    tasksContext.setState({
                                        ...tasksContext.state,
                                        tasks: data,
                                    })
                                } else {
                                    fetch(
                                        `https://taskathon-go.herokuapp.com/api/game/generate?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`,
                                        {
                                            method: 'GET',
                                            headers: new Headers({
                                                Authorization:
                                                    'Bearer ' +
                                                    auth.state.token,
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
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [auth.state.token])

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
