import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ListItemText from '@material-ui/core/ListItemText'
import { Color } from '../../../helpers/Color'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Map from '../map/Map'
import { Page } from '../../../helpers/Page'
import { useAppContext } from '../../../contexts/AppContext'
import { usePageContext } from '../../../contexts/PageContext'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        borderRadius: '15px',
        width: '100%',
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
        zIndex: 1,
        backgroundColor: Color.primary,
        position: 'absolute',
        width: '6.114130435vh',
        height: '6.114130435vh',
        transform: 'translateY(-5px)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '1.93236714vw',
        boxShadow:
            '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
})

export default function HomepageListItem({ type, style }) {
    const pageContext = usePageContext()
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
        targetPage = Page.journal
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
                if (showMap) {
                    pageContext.setState({
                        ...pageContext.state,
                        mapOpen: true,
                        page: targetPage,
                    })
                } else {
                    pageContext.setState({
                        ...pageContext.state,
                        page: targetPage,
                    })
                }
            }}
        >
            <div style={{ width: '100%' }}>
                <div
                    style={{
                        display: 'flex',
                        backgroundColor: Color.selection,
                        height: '5.027173913vh',
                    }}
                >
                    <div className={classes.floatingCircle}>
                        <img
                            src={iconSrc}
                            style={{
                                height: '4.076086957vh',
                                width: '4.076086957vh',
                            }}
                        />
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
                                fontSize: '2.54076087vh',
                                marginLeft: 'calc(4.07608957vh + 8vw)',
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
                            style={{ height: '12.63586957vh' }}
                        >
                            <Map noDrag={true} />
                        </div>
                    </CardContent>
                ) : (
                    <CardContent style={{ padding: '0px 2.898550725vw' }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <ListItemText
                                id={0}
                                style={{ margin: '0.8152173913vh 0' }}
                                primary={primaryText}
                                secondary={secondaryText}
                                primaryTypographyProps={{
                                    style: {
                                        fontSize: '2.445652174vh',
                                        fontWeight: '700',
                                    },
                                }}
                                secondaryTypographyProps={{
                                    style: {
                                        fontSize: '1.902173913vh',
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
