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

    const generateRequest = (position) => {
        fetch(
            `https://taskathon-go.herokuapp.com/api/game/generate?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`,
            {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + auth.state.token,
                }),
            }
        )
            .then((response) => {
                return response.json()
            })
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

    const tasksRequest = (position) => {
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
                    generateRequest(position)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        if (tasksContext.state.tasks.length === 0 && auth.state.token) {
            fetch(
                `https://taskathon-go.herokuapp.com/api/users/user/${context.state.username}`
            )
                .then((response) => response.json())
                .then((userData) => {
                    navigator.geolocation.getCurrentPosition(function (
                        position
                    ) {
                        locationContext.setState({
                            ...locationContext.state,
                            userLocation: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            },
                            viewportLocation: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            },
                        })
                        fetch(
                            `https://taskathon-go.herokuapp.com/api/users/user/${context.state.username}/edit`,
                            {
                                method: 'GET',
                                headers: new Headers({
                                    Authorization: 'Bearer ' + auth.state.token,
                                }),
                            }
                        )
                            .then((response) => response.json())
                            .then((protectedUserData) => {
                                context.setState({
                                    ...context.state,
                                    ...userData,
                                    email: protectedUserData.email,
                                })
                                tempContext.setState({
                                    ...tempContext.state,
                                    ...userData,
                                    email: protectedUserData.email,
                                })
                                tasksRequest(position)
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
        navigator.geolocation.watchPosition(function (position) {
            locationContext.setState({
                ...locationContext.state,
                userLocation: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                },
            })
        })
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
