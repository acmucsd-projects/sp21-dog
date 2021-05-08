import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import { Color } from '../helpers/Color'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Icon from '@material-ui/core/Icon'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Map from './Map'
import { Page } from '../helpers/Page'
import { useAppContext } from '../contexts/AppContext'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        borderRadius: '15px',
        width: '100%',
        //height: '75px',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    floatingCircle: {
        backgroundColor: Color.primary,
        position: 'absolute',
        width: '45px',
        height: '45px',
        transform: 'translateY(-5px)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '8px',
        boxShadow:
            '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
})

export default function HomepageListItem({ type, style }) {
    const context = useAppContext()
    const classes = useStyles()

    let title = 'title'
    let iconSrc = null
    let primaryText = 'primary text'
    let secondaryText = 'secondary text'
    let showMap = false
    let targetPage = Page.home

    if (type === 'nearbyTasks') {
        title = 'nearby tasks'
        iconSrc = './icons/tasks.svg'
        showMap = true
        targetPage = Page.tasks
    } else if (type === 'streaks') {
        title = 'streaks'
        iconSrc = './icons/journal.svg'
        primaryText = 'Keep your best Fitness streak!'
        secondaryText = `Streak: 14 days     Best: 14 days`
        targetPage = Page.profile
    } else if (type === 'journal') {
        title = 'journal'
        iconSrc = './icons/journal.svg'
        primaryText = 'Great job this week!'
        secondaryText = 'You averaged 4 tasks/day over the last 7 days.'
        targetPage = Page.journal
    } else if (type === 'leaderboards') {
        title = 'leaderboards'
        iconSrc = './icons/trophy.svg'
        primaryText = "You're in 2nd place with 45k pts!"
        secondaryText = '1.9k pts behind the next person.'
        targetPage = Page.leaderboards
    }

    return (
        <Card
            className={classes.root}
            style={style}
            onClick={() => {
                context.setState({ ...context.state, page: targetPage })
            }}
        >
            <div style={{ width: '100%' }}>
                <div
                    style={{
                        display: 'flex',
                        backgroundColor: Color.selection,
                        height: '37px',
                    }}
                >
                    <div className={classes.floatingCircle}>
                        <img src={iconSrc} />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <h3
                            style={{
                                marginLeft: '60px',
                                textTransform: 'capitalize',
                            }}
                        >
                            {title}
                        </h3>
                        <NavigateNextIcon style={{ height: '80%' }} />
                    </div>
                </div>
                {showMap ? (
                    <CardContent style={{ padding: 0 }}>
                        <div
                            className="content-wrapper"
                            style={{ height: '93px' }}
                        >
                            <Map noDrag={true} />
                        </div>
                    </CardContent>
                ) : (
                    <CardContent>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <ListItemText
                                id={0}
                                primary={primaryText}
                                secondary={secondaryText}
                                primaryTypographyProps={{
                                    style: {
                                        fontSize: '18px',
                                        fontWeight: '700',
                                    },
                                }}
                                secondaryTypographyProps={{
                                    style: {
                                        color: Color.textColor,
                                        whiteSpace: 'pre-wrap',
                                    },
                                }}
                            />
                        </div>
                    </CardContent>
                )}
            </div>
        </Card>
    )
}
