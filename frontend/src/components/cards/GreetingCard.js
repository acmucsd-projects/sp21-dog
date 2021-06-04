import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import { useAppContext } from '../../contexts/AppContext'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        borderRadius: '15px',
        width: '100%',
        height: '75px',
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})

export default function GreetingCard() {
    const classes = useStyles()
    const context = useAppContext()

    const [timeOfDay, setTimeOfDay] = React.useState()
    const [timeImgSrc, setTimeImgSrc] = React.useState()
    const [timeMessage, setTimeMessage] = React.useState()

    React.useEffect(() => {
        let hour = new Date().getHours()
        if (hour >= 23 || hour < 3) {
            setTimeOfDay('evening')
            setTimeImgSrc('/icons/moon.svg')
            setTimeMessage('Looks like you’re up pretty late. Stay safe!')
        } else if (hour >= 3 && hour < 7) {
            setTimeOfDay('morning')
            setTimeImgSrc('/icons/halfsun.svg')
            setTimeMessage('Looks like you’re up pretty early, Stay safe!')
        } else if (hour >= 7 && hour < 12) {
            setTimeOfDay('morning')
            setTimeImgSrc(`/icons/sun.svg`)
            setTimeMessage('Ready to kick start the day?')
        } else if (hour >= 12 && hour < 18) {
            setTimeOfDay('afternoon')
            setTimeImgSrc('/icons/sun.svg')
            setTimeMessage('Let’s knock out some tasks today.')
        } else if (hour >= 18 && hour < 21) {
            setTimeOfDay('evening')
            setTimeImgSrc('/icons/halfsun.svg')
            setTimeMessage('It’s almost the end of the day. Finish strong!')
        } else {
            setTimeOfDay('evening')
            setTimeImgSrc('/icons/moon.svg')
            setTimeMessage('It’s almost the end of the day. Finish strong!')
        }
    }, [])

    let greetingMessage = `Good ${timeOfDay}!`
    if (context.state.displayName != '') {
        greetingMessage = `Good ${timeOfDay}, ${context.state.displayName}!`
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <ListItemAvatar>
                        <Avatar alt={`sun`} src={timeImgSrc} />
                    </ListItemAvatar>
                    <ListItemText
                        id={0}
                        primary={greetingMessage}
                        secondary={timeMessage}
                        primaryTypographyProps={{
                            style: {
                                fontSize: '18px',
                                fontWeight: '700',
                            },
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
