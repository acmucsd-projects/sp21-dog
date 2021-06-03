import React from 'react'
import TasksList from './TasksList'
import Map from '../map/Map'
import FloatingActionButton from '../../buttons/FloatingActionButton'
import MapViewTask from '../map/MapViewTask'
import CustomDialog from '../../modals/CustomDialog'
import CustomButton from '../../buttons/CustomButton'
import Alert from '@material-ui/lab/Alert'
import { useAuthContext } from '../../../contexts/AuthContext'
import { useTasksContext } from '../../../contexts/TasksContext'
import { useLocationContext } from '../../../contexts/LocationContext'
import { Page } from '../../../helpers/Page'
import { usePageContext } from '../../../contexts/PageContext'

export default function Tasks() {
    const [layersOpen, setLayersOpen] = React.useState(false)
    const [errorOpen, setErrorOpen] = React.useState(false)
    const pageContext = usePageContext()
    const auth = useAuthContext()
    const tasksContext = useTasksContext()
    const locationContext = useLocationContext()

    const handleCenterCamera = () => {
        locationContext.setState({
            ...locationContext.state,
            viewportLocation: locationContext.state.userLocation,
        })
    }

    const generateTasks = () => {
        fetch(
            `https://taskathon-go.herokuapp.com/api/game/generate?latitude=${locationContext.state.userLocation.latitude}&longitude=${locationContext.state.userLocation.longitude}`,
            {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + auth.state.token,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                tasksContext.setState({
                    ...tasksContext.state,
                    tasks: data,
                })
                pageContext.setState({
                    ...pageContext.state,
                    page: Page.tasks,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        if (tasksContext.state.tasks.length === 0) {
            generateTasks()
        } else {
            tasksContext.setState({
                ...tasksContext.state,
                selectedId: null,
            })
        }
    }, [])

    return (
        <div className="overflow-container">
            <CustomDialog
                type="mapLayers"
                open={layersOpen}
                setOpen={setLayersOpen}
                keyName={'mapOptions'}
            />
            {errorOpen && (
                <div className="alertContainer">
                    <Alert
                        className="overlayBottom fadeIn"
                        severity="error"
                        onClose={() => {
                            setErrorOpen(false)
                        }}
                    >
                        You must be at the location to complete a task!
                    </Alert>
                </div>
            )}
            {pageContext.state.mapOpen ? (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="overlayTop">
                            <CustomButton
                                type="tasks"
                                variant="primary"
                                onClick={() => {
                                    if (tasksContext.state.selectedId) {
                                        const currentTask =
                                            tasksContext.state.tasks[
                                                tasksContext.state.tasks.findIndex(
                                                    (task) =>
                                                        task.id ===
                                                        tasksContext.state
                                                            .selectedId
                                                )
                                            ]
                                        locationContext.setState({
                                            ...location.context,
                                            userLocation: {
                                                latitude: currentTask.latitude,
                                                longitude:
                                                    currentTask.longitude,
                                            },
                                            viewportLocation: {
                                                latitude: currentTask.latitude,
                                                longitude:
                                                    currentTask.longitude,
                                            },
                                        })
                                    }
                                }}
                            >
                                Move to task (Demo Only)
                            </CustomButton>
                        </div>
                    </div>
                    <Map />
                    <div
                        className="float"
                        style={{ right: '3%', bottom: '15%' }}
                    >
                        <FloatingActionButton
                            imgSrc="./icons/journal.svg"
                            onClick={() => {
                                pageContext.setState({
                                    ...pageContext.state,
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
                        {tasksContext.state.selectedId != null && (
                            <MapViewTask
                                task={
                                    tasksContext.state.tasks[
                                        tasksContext.state.tasks.findIndex(
                                            (task) =>
                                                task.id ===
                                                tasksContext.state.selectedId
                                        )
                                    ]
                                }
                            />
                        )}
                    </div>
                </>
            ) : (
                <div style={{ width: '100%', padding: '0 10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CustomButton
                            type="tasks"
                            variant="primary"
                            halfWidth={true}
                            onClick={generateTasks}
                        >
                            Generate New Tasks (Demo Only)
                        </CustomButton>
                    </div>
                    <TasksList
                        tasks={tasksContext.state.tasks}
                        setErrorOpen={setErrorOpen}
                    />
                    <div
                        className="float"
                        style={{ right: '3%', bottom: '15%' }}
                    >
                        <FloatingActionButton
                            imgSrc="./icons/map.svg"
                            onClick={() => {
                                pageContext.setState({
                                    ...pageContext.state,
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
