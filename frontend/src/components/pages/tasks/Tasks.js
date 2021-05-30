import React from 'react'
import TasksList from './TasksList'
import Map from '../map/Map'
import { useAppContext } from '../../../contexts/AppContext'
import FloatingActionButton from '../../buttons/FloatingActionButton'
import MapViewTask from '../map/MapViewTask'
import CustomDialog from '../../modals/CustomDialog'
import { useAuthContext } from '../../../contexts/AuthContext'

export default function Tasks() {
    const [layersOpen, setLayersOpen] = React.useState(false)
    const context = useAppContext()
    const auth = useAuthContext()

    const handleCenterCamera = () => {
        context.setState({
            ...context.state,
            viewportLocation: context.state.userLocation,
        })
    }

    React.useEffect(() => {
        fetch(
            `https://taskathon-go.herokuapp.com/api/users/user/${context.state.username}/tasks`,
            {
                headers: new Headers({
                    authorization: 'Bearer ' + auth.state.token,
                    credentials: 'include',
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="overflow-container">
            <CustomDialog
                type="mapLayers"
                open={layersOpen}
                setOpen={setLayersOpen}
                keyName={'mapOptions'}
            />
            {context.state.mapOpen ? (
                <>
                    <Map />
                    <div
                        className="float"
                        style={{ right: '3%', bottom: '15%' }}
                    >
                        <FloatingActionButton
                            imgSrc="./icons/journal.svg"
                            onClick={() => {
                                context.setState({
                                    ...context.state,
                                    mapOpen: false,
                                })
                            }}
                        />
                    </div>
                    <div
                        className="float"
                        style={{ right: '3%', bottom: '24%' }}
                    >
                        <FloatingActionButton
                            imgSrc="./icons/maparrow.svg"
                            onClick={() => {
                                handleCenterCamera()
                            }}
                        />
                    </div>
                    <div
                        className="float"
                        style={{ right: '3%', bottom: '33%' }}
                    >
                        <FloatingActionButton
                            imgSrc="./icons/layers.svg"
                            onClick={() => {
                                setLayersOpen(true)
                            }}
                        />
                    </div>
                    <div
                        className="float"
                        style={{ bottom: '13%', width: '83%' }}
                    >
                        <MapViewTask />
                    </div>
                </>
            ) : (
                <div style={{ width: '100%', padding: '0 10px' }}>
                    <TasksList />
                    <div
                        className="float"
                        style={{ right: '3%', bottom: '15%' }}
                    >
                        <FloatingActionButton
                            imgSrc="./icons/map.svg"
                            onClick={() => {
                                context.setState({
                                    ...context.state,
                                    mapOpen: true,
                                })
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
