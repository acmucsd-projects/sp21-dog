import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import CustomButton from '../../buttons/CustomButton'
import Typography from '@material-ui/core/Typography'
import { useAppContext } from '../../../contexts/AppContext'
import { Page } from '../../../helpers/Page'
import { useLocationContext } from '../../../contexts/LocationContext'
import { useTasksContext } from '../../../contexts/TasksContext'
import { usePageContext } from '../../../contexts/PageContext'
import { useAuthContext } from '../../../contexts/AuthContext'

const useStyles = makeStyles((theme) => ({
    imageIcon: {
        width: '18px',
        height: '18px',
        marginRight: '2%',
    },
    completed: {
        background:
            'linear-gradient(90deg, rgba(255,255,255,1) 65%, #44C179 100%)',
        transition: 'width 2s, height 2s, background-color 2s, transform 2s',
    },
}))

export default function TaskListItem({ id, task, mapView, setErrorOpen }) {
    const pageContext = usePageContext()
    const classes = useStyles()
    const locationContext = useLocationContext()
    const tasksContext = useTasksContext()
    const auth = useAuthContext()

    let margin = '15px 0'
    if (mapView) {
        margin = '8px'
    }

    const stats = ['Fitness', 'Nature', 'Knowledge', 'Community']

    const handleCompleteTask = () => {
        fetch(
            `https://taskathon-go.herokuapp.com/api/game/check?taskId=${task.id}&latitude=${locationContext.state.userLocation.latitude}&longitude=${locationContext.state.userLocation.longitude}`,
            {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + auth.state.token,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.completed == null) {
                    setErrorOpen(true)
                } else {
                    let updatedTasks = tasksContext.state.tasks
                    updatedTasks[
                        updatedTasks.findIndex((item) => item.id === task.id)
                    ].completed = data.completed
                    tasksContext.setState({
                        ...tasksContext.state,
                        tasks: updatedTasks,
                    })
                    setErrorOpen(false)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function equals(obj1, obj2) {
        return Object.keys(obj1).every((key) => {
            return obj1[key] === obj2[key]
        })
    }

    const distance = (userLocation, taskLocation) => {
        if (equals(userLocation, taskLocation)) {
            return 0
        } else {
            var radlat1 = (Math.PI * userLocation.latitude) / 180
            var radlat2 = (Math.PI * taskLocation.latitude) / 180
            var theta = userLocation.longitude - taskLocation.longitude
            var radtheta = (Math.PI * theta) / 180
            var dist =
                Math.sin(radlat1) * Math.sin(radlat2) +
                Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
            if (dist > 1) {
                dist = 1
            }
            dist = Math.acos(dist)
            dist = (dist * 180) / Math.PI
            dist = dist * 60 * 1.1515
            dist = Math.round(dist * 100) / 100
            return dist
        }
    }

    if (task == null) {
        return <div></div>
    }

    const miles = distance(locationContext.state.userLocation, {
        latitude: task.latitude,
        longitude: task.longitude,
    })

    return (
        <Accordion style={{ margin: margin }}>
            <AccordionSummary
                aria-controls="panel2a-content"
                id="panel2a-header"
                className={task.completed != null ? classes.completed : null}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemAvatar>
                            <Avatar
                                alt={`logo`}
                                src={`/icons/${stats[
                                    task.taskType
                                ].toLowerCase()}.svg`}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            id={0}
                            style={{ maxWidth: '80%' }}
                            primary={task.title}
                            secondary={task.text}
                            primaryTypographyProps={{
                                style: {
                                    fontSize: '18px',
                                    fontWeight: '700',
                                },
                            }}
                        />
                    </div>
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        {task.completed != null ? (
                            <img
                                src="icons/complete.svg"
                                alt="task complete icon"
                            />
                        ) : (
                            <>
                                <p>{`${task.points} pts`}</p>
                                <p>{`${miles} mi`}</p>
                            </>
                        )}
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div style={{ width: '100%' }}>
                    {task.completed == null && !mapView && (
                        <div
                            style={{
                                display: 'flex',
                            }}
                        >
                            <CustomButton
                                type="tasks"
                                variant="primary"
                                onClick={() => {
                                    pageContext.setState({
                                        ...pageContext.state,
                                        page: Page.tasks,
                                        mapOpen: true,
                                    })
                                    locationContext.setState({
                                        ...locationContext.state,
                                        viewportLocation: {
                                            latitude: task.latitude,
                                            longitude: task.longitude,
                                        },
                                    })
                                    tasksContext.setState({
                                        ...tasksContext.state,
                                        selectedId: id,
                                    })
                                }}
                            >
                                View on Map
                            </CustomButton>

                            <CustomButton
                                type="tasks"
                                variant="secondary"
                                onClick={handleCompleteTask}
                            >
                                Complete Task
                            </CustomButton>
                        </div>
                    )}
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                height: '100%',
                                marginBottom: '2%',
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '4%',
                                    }}
                                >
                                    <img
                                        className={classes.imageIcon}
                                        src={`/icons/${stats[
                                            task.taskType
                                        ].toLowerCase()}.svg`}
                                    />
                                    <p>{`+${task.points} ${
                                        stats[task.taskType]
                                    } Pts`}</p>
                                </div>

                                <div
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        className={classes.imageIcon}
                                    >
                                        <img
                                            src="/icons/map.svg"
                                            style={{
                                                width: '70%',
                                                height: '70%',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        {task.address != null &&
                                            task.address
                                                .split('\n')
                                                .map((str) => <p>{str}</p>)}
                                    </div>
                                </div>
                            </div>
                            {task.completed == null && (
                                <div
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        height: '100%',
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        className={classes.imageIcon}
                                    >
                                        <img
                                            src="/icons/location.svg"
                                            style={{
                                                width: '70%',
                                                height: '70%',
                                            }}
                                        />
                                    </div>
                                    <p>{`${miles} miles away`}</p>
                                </div>
                            )}
                        </div>
                        <Typography>{task.description}</Typography>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}
